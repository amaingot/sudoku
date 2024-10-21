import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import TeamPage from "../pages/TeamPage";
import ErrorPage from "../pages/ErrorPage";
import AuthCallbackPage from "../pages/AuthCallbackPage";
import SignUpPage from "../pages/SignUpPage";
import SignUpSuccessPage from "../pages/SignUpSuccessPage";
import SignUpConfirmPage from "../pages/SignUpConfirmPage";
import DashboardPage from "../pages/DashboardPage";
import GamesPage from "../pages/GamesPage";
import SettingsPage from "../pages/SettingsPage";

export const appRouter = createBrowserRouter([
  {
    path: "/auth/callback",
    element: <AuthCallbackPage />,
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/team", element: <TeamPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/error", element: <ErrorPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/signup",
    element: <AuthLayout />,
    children: [
      { path: "/signup", element: <SignUpPage /> },
      { path: "/signup/confirm", element: <SignUpConfirmPage /> },
      { path: "/signup/success", element: <SignUpSuccessPage /> },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { path: "/app", element: <DashboardPage /> },
      { path: "/app/games", element: <GamesPage /> },
      { path: "/app/settings", element: <SettingsPage /> },
      { path: "/app/*", element: <NotFoundPage /> },
    ],
  },
]);
