import { StyleSheet, Button } from "react-native";

import View from "@/components/View";
import Text from "@/components/Text";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginScreen() {
  const auth = useAuth();

  if (auth.loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  if (auth.user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Logged in as {auth.user.given_name}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Button onPress={auth.login} title="Login" />
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
});
