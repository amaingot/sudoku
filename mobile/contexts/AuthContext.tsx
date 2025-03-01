import React from "react";
import { router } from "expo-router";

import {
  makeRedirectUri,
  ResponseType,
  exchangeCodeAsync,
  revokeAsync,
  fetchUserInfoAsync,
  AuthRequest,
  fetchDiscoveryAsync,
  TokenResponse,
  refreshAsync,
  Prompt,
  TokenTypeHint,
} from "expo-auth-session";

import config from "@/utils/config";
import { parseJwt } from "@/utils/jwt";
import { getSecureStorageValue } from "@/utils/secureStorage";
import useSecureStorage from "../hooks/useSecureStorage";

interface User {
  app_account_id: string;
  app_user_id: string;
  email: string;
  email_verified: true;
  family_name: string;
  given_name: string;
  name: string;
  nickname: string;
  picture: string;
  role: string;
  status: string;
  sub: string;
  updated_at: string;
  userRoles: string[];
}

interface AuthContextState {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  error?: string;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const USER_KEY = "user";

const getUserFromSecureStore = (): User | undefined => {
  const rawUser = getSecureStorageValue(USER_KEY);
  if (!rawUser) return undefined;
  try {
    return JSON.parse(rawUser) as User;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const ACCESS_TOKEN_KEY = "access_token";

export const getAccessTokenFromSecureStore = (): string | undefined => {
  return getSecureStorageValue(ACCESS_TOKEN_KEY);
};

const REFRESH_TOKEN_KEY = "refresh_token";

const getRefreshTokenFromSecureStore = (): string | undefined => {
  return getSecureStorageValue(REFRESH_TOKEN_KEY);
};

const AuthContext = React.createContext<AuthContextState>({
  user: getUserFromSecureStore(),
  accessToken: getAccessTokenFromSecureStore(),
  refreshToken: getRefreshTokenFromSecureStore(),
  loading: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useSecureStorage<User | undefined>({
    key: USER_KEY,
    isObject: true,
  });
  const [accessToken, setAccessToken] = useSecureStorage({
    key: ACCESS_TOKEN_KEY,
  });
  const [refreshToken, setRefreshToken] = useSecureStorage({
    key: REFRESH_TOKEN_KEY,
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const redirectUri = makeRedirectUri({ preferLocalhost: true });

  const getDiscovery = React.useCallback((domain: string) => {
    return fetchDiscoveryAsync(`https://${domain}`);
  }, []);

  const saveTokenResponse = async (tokenResponse: TokenResponse) => {
    await setAccessToken(tokenResponse.accessToken);

    if (tokenResponse.refreshToken) {
      await setRefreshToken(tokenResponse.refreshToken);
    }
  };

  const login = async () => {
    console.debug("Logging in");
    if (loading || !!user) {
      console.debug(`loading (${loading}) or user (${!!user}) already exists`);
      return;
    }

    const authRequest = new AuthRequest({
      responseType: ResponseType.Code,
      clientId: config.AUTH_CLIENT_ID,
      redirectUri,
      usePKCE: true,
      scopes: ["openid", "email", "phone", "profile"],
      prompt: Prompt.Login,
      extraParams: {
        // audience: config.AUTH_AUDIENCE,
      },
    });

    const discovery = await getDiscovery(config.AUTH_USER_POOL_ENDPOINT);

    console.debug("Auth request", authRequest);
    const result = await authRequest.promptAsync(discovery, {});
    console.debug("Auth result", result);
    setLoading(true);

    if (result?.type === "success") {
      if (result.error) {
        console.error(result.error);
        setError(result.error.message);
        setLoading(false);
      } else {
        const tokenResponse = await exchangeCodeAsync(
          {
            clientId: config.AUTH_CLIENT_ID,
            code: result.params.code,
            redirectUri,
            extraParams: {
              code_verifier: authRequest?.codeVerifier || "",
            },
          },
          discovery
        );
        await saveTokenResponse(tokenResponse);

        const userInfo = await fetchUserInfoAsync(tokenResponse, discovery);
        await setUser(userInfo as User);
        console.debug("User info", userInfo);
      }
    }
    setLoading(false);
    router.replace("/(app)");
  };

  const logout = async () => {
    console.debug("logging out");
    setLoading(true);
    if (typeof refreshToken === "string") {
      try {
        console.log(`https://${config.AUTH_USER_POOL_ENDPOINT}`);
        const discovery = await getDiscovery(config.AUTH_USER_POOL_ENDPOINT);
        console.log("discovery", discovery);

        const revoked = await revokeAsync(
          {
            token: refreshToken,
            clientId: config.AUTH_CLIENT_ID,
            tokenTypeHint: TokenTypeHint.RefreshToken,
          },
          discovery
        );
        console.debug("Revoked token", revoked);
      } catch (error) {
        console.error(
          `Failed to revoke token.\n  Error: ${error}\n  Refresh Token: ${JSON.stringify(
            refreshToken
          )}\n Access Token: ${accessToken}`
        );
      }
    }
    await setUser(undefined);
    await setAccessToken(undefined);
    await setRefreshToken(undefined);
    router.replace("/login");
    setLoading(false);
  };

  const refreshAccessToken = async () => {
    try {
      if (!refreshToken || !accessToken || loading) return;

      setLoading(true);
      const parsedAccessToken = parseJwt(accessToken);

      const now = Math.floor(new Date().getTime() / 1000);
      const isExpired = parsedAccessToken.exp - now < 60;
      console.debug(
        `isExpired: ${isExpired}, now: ${now}, exp: ${parsedAccessToken.exp}`
      );
      if (!isExpired) {
        console.debug("token is still valid");
        return;
      }

      console.debug("refreshing token");
      const discovery = await getDiscovery(config.AUTH_USER_POOL_ENDPOINT);

      const tokenResponse = await refreshAsync(
        {
          clientId: config.AUTH_CLIENT_ID,
          refreshToken: refreshToken,
          extraParams: {
            redirectUri,
            // audience: config.AUTH_AUDIENCE,
          },
        },
        discovery
      );
      console.info("tokenResponse", tokenResponse);
      await saveTokenResponse(tokenResponse);
      setLoading(false);
    } catch (e) {
      console.error(
        `Failed to refresh token.\n  Error: ${e}\n  Refresh Token: ${JSON.stringify(
          refreshToken
        )}\n Access Token: ${accessToken}`
      );
      setError("Failed to refresh token");
      setLoading(false);
      await logout();
    }
  };

  React.useEffect(() => {
    // Immediately refresh the token if it is expired
    refreshAccessToken();

    // Implementing the setInterval method
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 10000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        error,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
