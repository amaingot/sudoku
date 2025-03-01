import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import { useListSudokuGamesQuery } from "@/graphql";
import { ListItem } from "@rneui/themed";

export default function GamesScreen() {
  const gamesResponse = useListSudokuGamesQuery();
  const games = gamesResponse.data?.listSudokuGames.items || [];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={games}
        renderItem={(item) => (
          <ListItem onPress={() => console.log(item.item.id)}>
            <ListItem.Swipeable>
              <ListItem.Title>{item.item.createdAt}</ListItem.Title>
            </ListItem.Swipeable>
          </ListItem>
        )}
      />
    </SafeAreaView>
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
