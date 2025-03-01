import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const getSecureStorageValue = (key: string): string | undefined => {
  let value: string | null = null;
  if (Platform.OS === "web") {
    value = window.localStorage.getItem(key);
  } else if (Platform.OS === "android" || Platform.OS === "ios") {
    value = SecureStore.getItem(key);
  } else {
    console.error(
      `Unsupported platform for getting secure storage: ${Platform.OS}`
    );
    return undefined;
  }

  if (value === null) {
    return undefined;
  }

  return value;
};

export const setSecureStorageValue = async (
  key: string,
  value: string | undefined
): Promise<void> => {
  if (Platform.OS === "web") {
    if (value === undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
    }
  } else if (Platform.OS === "android" || Platform.OS === "ios") {
    if (value === undefined) {
      await SecureStore.deleteItemAsync(key);
    } else {
      SecureStore.setItem(key, value);
    }
  } else {
    console.error(
      `Unsupported platform for setting secure storage: ${Platform.OS}`
    );
  }
};
