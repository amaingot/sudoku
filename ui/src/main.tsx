import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";

import { AuthProvider } from "./contexts/AuthContext";
import client from "./graphql/client";
import App from "./App";
import { theme } from "./utils/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <AuthProvider>
        <ApolloProvider client={client}>
          <ModalsProvider>
            <Notifications />
            <App />
          </ModalsProvider>
        </ApolloProvider>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
