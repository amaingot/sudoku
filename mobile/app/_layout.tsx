import React from "react";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { ThemeProvider } from "@rneui/themed";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { client } from "@/graphql/client";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/contexts/AuthContext";
import { ApolloProvider } from "@apollo/client";
import { makeTheme } from "@/utils/theme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(app)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Wittgenstein: require("../assets/fonts/Wittgenstein.ttf"),
    Fustat: require("../assets/fonts/Fustat.ttf"),
    FiraCode: require("../assets/fonts/FiraCode.ttf"),
  });

  const theme = React.useMemo(() => makeTheme(colorScheme), [colorScheme]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ApolloProvider client={client}>
          <NavigationThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <ThemeProvider theme={theme}>
              <Stack>
                <Stack.Screen
                  name="(app)"
                  options={{ headerShown: true, title: "Sudoku" }}
                />
                <Stack.Screen
                  name="login"
                  options={{ presentation: "modal" }}
                />
              </Stack>
            </ThemeProvider>
          </NavigationThemeProvider>
        </ApolloProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
