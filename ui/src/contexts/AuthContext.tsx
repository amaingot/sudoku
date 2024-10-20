/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { auth, Auth } from "../utils/auth";

const AuthContext = React.createContext<Auth>(auth);

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    auth.init().then(() => setLoaded(true));
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (auth.isAuthenticated && auth.isAccessTokenExpired()) {
        auth.refreshAccessToken();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      {loaded && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): Auth => React.useContext(AuthContext);
