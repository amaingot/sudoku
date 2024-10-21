import React from "react";
import { useListSudokuGamesQuery } from "../graphql";
import { Group, Table, Title } from "@mantine/core";

const GamesPage: React.FC = () => {
  const gamesResponse = useListSudokuGamesQuery();

  return (
    <>
      <Group justify="space-between">
        <Title>Games</Title>
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Game ID</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Updated At</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {gamesResponse.data?.listSudokuGames.items.map((game) => (
            <Table.Tr key={game.id}>
              <Table.Td>{game.id}</Table.Td>
              <Table.Td>{game.createdAt}</Table.Td>
              <Table.Td>{game.updatedAt}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};

export default GamesPage;
