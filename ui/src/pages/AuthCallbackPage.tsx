import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleAuth = React.useCallback(async () => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (typeof code === "string") {
      const returnTo = await auth.handleAuthentication(code);
      navigate(returnTo);
    } else {
      navigate("/");
    }
  }, [navigate, auth]);

  React.useEffect(() => {
    handleAuth();
  }, [handleAuth]);

  return <></>;
};

export default AuthCallbackPage;
