import config from "./config";

export interface User {
  sub: string;
  username: string;
  email: string;
  email_verified: "true" | "false";
  family_name: string;
  given_name: string;
  account_id: string;
  employee_id: string;
}

export interface Token {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: string;
  expires_at: string;
}

interface ParsedIDToken {
  at_hash: string;
  sub: string;
  "cognito:groups": string[];
  email_verified: boolean;
  iss: string;
  "cognito:username": string;
  given_name: string;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  exp: number;
  iat: number;
  family_name: string;
  jti: string;
  email: string;
}

const USER_CACHE_KEY = "user";
const TOKEN_CACHE_KEY = "token";
const RETURN_PATH_KEY = "returnPath";
const REDIRECT_URI = `${window.location.origin}/auth/callback`;

/**
 * Encodes an object in "application/x-www-form-urlencoded" format.
 * @param body The object to encode.
 * @returns
 */
const encodeBody = (body: Record<string, string>): string =>
  Object.entries(body)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

const parseJwt = (token: string): ParsedIDToken => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export class Auth {
  private _initPromise: Promise<void> | undefined;
  private _handleAuthenticationPromise: Promise<string> | undefined;
  private _parsedIdToken: ParsedIDToken | undefined;

  private async _init() {
    if (this.isAccessTokenExpired()) {
      await this.refreshAccessToken();
    }

    if (this.accessToken && !this.user) {
      await this.fetchUserInfo();
    }
  }

  /**
   * Initialize the auth object.
   * @returns {Promise<void>}
   */
  async init() {
    if (!this._initPromise) {
      this._initPromise = this._init();
    }
    await this._initPromise;
  }

  /**
   * Get the token data.
   */
  get tokenData(): Token | undefined {
    const token = localStorage.getItem(TOKEN_CACHE_KEY);
    if (token) {
      return JSON.parse(token) as Token;
    }
    return undefined;
  }

  /**
   * Get the access token.
   */
  get accessToken(): string | undefined {
    return this.tokenData?.access_token;
  }

  /**
   * Get the id token.
   */
  get idToken(): string | undefined {
    return this.tokenData?.id_token;
  }

  /**
   * Get the parsed id token.
   */
  get parsedIdToken(): ParsedIDToken | undefined {
    if (this._parsedIdToken) {
      return this._parsedIdToken;
    }
    if (this.idToken) {
      this._parsedIdToken = parseJwt(this.idToken);
      return this._parsedIdToken;
    }
    return undefined;
  }

  /**
   * Verify if the user is an admin.
   */
  get isAdmin() {
    return (this.parsedIdToken?.["cognito:groups"] || []).includes("admins");
  }

  /**
   * Verify if the user is authenticated without initializing the auth object.
   * This is the quick way to check if the user is authenticated.
   */
  get isAuthenticated() {
    return !!this.accessToken;
  }

  /**
   * Verify if the user is authenticated after initializing the auth object.
   * This is the recommended way to check if the user is authenticated.
   */
  async isAuthenticatedAsync() {
    await this.init();
    return this.isAuthenticated;
  }

  /**
   * Verify if the access token is expired.
   */
  isAccessTokenExpired() {
    if (this.tokenData) {
      return new Date(this.tokenData.expires_at) < new Date(Date.now());
    }
    return true;
  }

  /**
   * Get the user info that is returned from the identity provider.
   */
  get user() {
    const userInfo = localStorage.getItem(USER_CACHE_KEY);
    if (userInfo) {
      return JSON.parse(userInfo) as User;
    }
    return undefined;
  }

  /**
   * Get the user id. The user id is from the user info sub field.
   */
  get userId() {
    return this.user?.sub;
  }

  private saveToken(token: Omit<Token, "expires_at">) {
    localStorage.setItem(
      TOKEN_CACHE_KEY,
      JSON.stringify({
        ...token,
        expires_at: new Date(Date.now() + token.expires_in * 1000),
      })
    );
  }

  private saveUserInfo(user: User) {
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
  }

  /**
   * Get the access token. If the access token is expired, it will refresh the access token.
   */
  async getAccessToken(): Promise<string | undefined> {
    if (this.isAccessTokenExpired()) {
      await this.refreshAccessToken();
    }
    return this.accessToken;
  }

  /**
   * Login the user by redirecting to the identity provider.
   */
  login(returnPath?: string) {
    if (returnPath) {
      window.localStorage.setItem(RETURN_PATH_KEY, returnPath);
    }
    const loginUrl =
      `https://${config.AUTH_DOMAIN}/authorize` +
      `?client_id=${config.AUTH_CLIENT_ID}` +
      "&response_type=code" +
      "&scope=aws.cognito.signin.user.admin+phone+email+openid+profile" +
      `&redirect_uri=${REDIRECT_URI}`;

    window.location.href = loginUrl;
  }

  /**
   * Logout the user by redirecting to the identity provider.
   */
  logout() {
    const logoutUrl =
      `https://${config.AUTH_DOMAIN}/logout` +
      `?client_id=${config.AUTH_CLIENT_ID}` +
      `&logout_uri=${window.location.origin}`;

    this._parsedIdToken = undefined;
    window.localStorage.removeItem(USER_CACHE_KEY);
    window.localStorage.removeItem(TOKEN_CACHE_KEY);

    window.location.href = logoutUrl;
  }

  /**
   * Refresh the access token using the refresh token.
   */
  async refreshAccessToken(): Promise<void> {
    const refreshToken = this.tokenData?.refresh_token;
    if (typeof refreshToken !== "string") {
      return;
    }

    const response = await fetch(`https://${config.AUTH_DOMAIN}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeBody({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: config.AUTH_CLIENT_ID,
      }),
    });
    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      if (data.error === "invalid_grant") {
        this.logout();
      }
    } else {
      this.saveToken({
        ...data,
        refresh_token:
          typeof data.refresh_token === "string"
            ? data.refresh_token
            : refreshToken,
      });
    }
  }

  private async fetchUserInfo(): Promise<User> {
    const token = this.accessToken;
    if (typeof token !== "string") {
      throw new Error("Not logged in");
    }
    const response = await fetch(
      `https://${config.AUTH_DOMAIN}/oauth2/userInfo`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      throw new Error(data.error);
    } else {
      this.saveUserInfo({
        ...data,
        employee_id: data["custom:employee_id"],
        account_id: data["custom:account_id"],
      });
      return data;
    }
  }

  private async _handleAuthentication(code: string): Promise<string> {
    const returnPath = window.localStorage.getItem(RETURN_PATH_KEY);
    try {
      const response = await fetch(
        `https://${config.AUTH_DOMAIN}/oauth2/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: encodeBody({
            grant_type: "authorization_code",
            client_id: config.AUTH_CLIENT_ID,
            code,
            redirect_uri: REDIRECT_URI,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      this.saveToken(data);

      await this.fetchUserInfo();
    } catch (err) {
      console.error(err);

      const errorTitle = "An authentication error occurred";
      const errorHeadline = "Auth Error";
      const errorDescription = `Please try again later. The error message is: ${JSON.stringify(
        err
      )}`;
      return (
        "/error" +
        `?errorTitle=${encodeURIComponent(errorTitle)}` +
        `&errorHeadline=${encodeURIComponent(errorHeadline)}` +
        `&errorDescription=${encodeURIComponent(errorDescription)}`
      );
    } finally {
      window.localStorage.removeItem(RETURN_PATH_KEY);
    }
    return returnPath || "/app";
  }

  /**
   * Exchange an authorization code for tokens. This is used for the callback url.
   * @param code The authorization code.
   * @returns The return path to redirect the user to.
   */
  async handleAuthentication(code: string): Promise<string> {
    if (!this._handleAuthenticationPromise) {
      this._handleAuthenticationPromise = this._handleAuthentication(code);
    }
    return this._handleAuthenticationPromise;
  }
}

export const auth = new Auth();
