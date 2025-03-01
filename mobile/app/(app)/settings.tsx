import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

import View from "@/components/View";
import Text from "@/components/Text";
import { useAuth } from "@/contexts/AuthContext";

export default function SettingsScreen() {
  const auth = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button onPress={() => auth.logout()}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
