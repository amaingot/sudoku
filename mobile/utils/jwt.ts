interface JsonWebToken {
  app_account_id: string;
  app_user_id: string;
  aud: string[];
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  role: string;
  scope: string;
  status: string;
  sub: string;
  userRoles: string[];
}

export const parseJwt = (token: string): JsonWebToken => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload) as JsonWebToken;
};
