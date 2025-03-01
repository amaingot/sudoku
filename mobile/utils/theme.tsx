import { Platform } from "react-native";

import { createTheme } from "@rneui/themed";

export const makeTheme = (colorScheme: "dark" | "light" | null | undefined) =>
  createTheme({
    mode: colorScheme === "dark" ? "dark" : "light",
    components: {
      SearchBar: {
        platform: Platform.OS === "android" ? "android" : "ios",
        searchIcon: {
          name: "search",
        },
        clearIcon: {
          name: "close-circle",
        }
      },
    },
  });
