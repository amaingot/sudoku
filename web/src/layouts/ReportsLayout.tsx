import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ReportsLayout: React.FC = () => {
  const location = useLocation();
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    auth.login(`${location.pathname}${location.search}`);
    return <></>;
  }

  return <Outlet />;
};

export default ReportsLayout;
