import React from "react";
import { Redirect, Tabs } from "expo-router";
import {
  IconHome,
  IconHistory,
  IconSettings,
} from "@tabler/icons-react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/contexts/AuthContext";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const auth = useAuth();

  if (!auth.user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconHome size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: "Games",
          tabBarIcon: ({ color }) => <IconHistory size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <IconSettings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
