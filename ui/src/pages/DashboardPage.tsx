import React from "react";
import { Title, Group, Button, Paper, Slider, Box } from "@mantine/core";
import { IconGoGame } from "@tabler/icons-react";
import { useCreateSudokuGameMutation, useGetMeQuery } from "../graphql";
import SudokuBoard from "../components/SudokuBoard";

const DashboardPage: React.FC = () => {
  const [difficulty, setDifficulty] = React.useState(5);
  const [createSudokuGame, createSudokuGameResponse] =
    useCreateSudokuGameMutation({
      refetchQueries: ["GetMe"],
    });

  const meResponse = useGetMeQuery();

  const currentGame = meResponse.data?.me.currentSudokuGame;

  return (
    <>
      <Group justify="space-between" mb="sm">
        <Title mb={0}>Dashboard</Title>
        <Group gap="sm">
          <Box w={300}>
            <Slider
              value={difficulty}
              onChange={(value) => setDifficulty(value)}
              min={1}
              max={10}
              step={1}
              marks={[
                // { value: 1, label: "Novice" },
                { value: 2, label: "Easy" },
                { value: 5.5, label: "Medium" },
                // { value: 6, label: "Hard" },
                { value: 9, label: "Hard" },
                // { value: 10, label: "Master" },
              ]}
            />
          </Box>
          <Button
            rightSection={<IconGoGame />}
            loading={createSudokuGameResponse.loading}
            onClick={() =>
              createSudokuGame({ variables: { input: { difficulty } } })
            }
          >
            New Game
          </Button>
        </Group>
      </Group>
      <Paper>
        {currentGame && (
          <SudokuBoard
            w="calc(100vh - 300px)"
            gameId={currentGame.id}
            board={currentGame.board}
          />
        )}
      </Paper>
    </>
  );
};

export default DashboardPage;
