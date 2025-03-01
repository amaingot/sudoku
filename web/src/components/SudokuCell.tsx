import React from "react";
import {
  SudokuGameCellFragment,
  useMakeSudokuGameMoveMutation,
} from "../graphql";
import { Center, Text, Box, SimpleGrid } from "@mantine/core";

interface Props {
  gameId: string;
  cell: SudokuGameCellFragment;
  size: number;
  selectedNumber?: number;
  notesMode: boolean;
  touchMode: boolean;
}

const SudokuCell: React.FC<Props> = ({
  cell,
  size,
  selectedNumber,
  notesMode,
  gameId,
  touchMode,
}) => {
  const { x, y, number, isFixed, notes, isCorrect } = cell;
  const [makeMove] = useMakeSudokuGameMoveMutation();

  const setNumber = async (n: number) =>
    makeMove({
      variables: {
        input: {
          type: "SET_NUMBER",
          gameId,
          x,
          y,
          number: n,
        },
      },
    });

  const removeNumber = async () =>
    makeMove({
      variables: { input: { type: "REMOVE_NUMBER", gameId, x, y, number: 0 } },
    });
  const addNote = async (n: number) =>
    makeMove({
      variables: { input: { type: "ADD_NOTE", gameId, x, y, number: n } },
    });
  const removeNote = async (n: number) =>
    makeMove({
      variables: { input: { type: "REMOVE_NOTE", gameId, x, y, number: n } },
    });

  if (number) {
    return (
      <Box
        h={size}
        bg={selectedNumber === number ? "blue.1" : undefined}
        style={{
          borderRight: y % 3 === 2 ? "1px solid #000" : "1px solid #ccc",
          borderBottom: x % 3 === 2 ? "1px solid #000" : "1px solid #ccc",
          borderTop: x === 0 ? "1px solid #000" : "1px solid #ccc",
          borderLeft: y === 0 ? "1px solid #000" : "1px solid #ccc",
          cursor: isFixed ? "not-allowed" : "pointer",
        }}
        onClick={() => removeNumber()}
      >
        <Center w="100%" h="100%">
          <Text size={`${size*.6}px`} c={isFixed ? "black" : isCorrect ? "blue" : "red"}>
            {number || ""}
          </Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box
      h={size}
      bg={selectedNumber === number ? "blue.1" : undefined}
      style={{
        borderRight: y % 3 === 2 ? "1px solid #000" : "1px solid #ccc",
        borderBottom: x % 3 === 2 ? "1px solid #000" : "1px solid #ccc",
        borderTop: x === 0 ? "1px solid #000" : "1px solid #ccc",
        borderLeft: y === 0 ? "1px solid #000" : "1px solid #ccc",
      }}
    >
      <SimpleGrid
        cols={3}
        spacing={0}
        onClick={() => {
          if (!touchMode || !selectedNumber) {
            return;
          }
          if (notesMode) {
            if (notes.includes(selectedNumber)) {
              removeNote(selectedNumber);
            } else {
              addNote(selectedNumber);
            }
          } else {
            setNumber(selectedNumber);
          }
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <Center
            key={n}
            w={size / 3}
            h={size / 3}
            bg={
              notes.includes(n)
                ? selectedNumber === n
                  ? "blue.7"
                  : undefined // "gray.6"
                : undefined
            }
            style={{
              borderRadius: size / 3,
              cursor: touchMode ? undefined : "pointer",
            }}
            onClick={() => {
              if (touchMode) {
                return;
              }
              if (notesMode) {
                if (notes.includes(n)) {
                  removeNote(n);
                } else {
                  addNote(n);
                }
              } else {
                setNumber(n);
              }
            }}
          >
            <Text
              size="sm"
              c={
                notes.includes(n)
                  ? selectedNumber === n
                    ? "white"
                    : "blue"
                  : touchMode
                  ? "transparent"
                  : "gray.4"
              }
              fw={notes.includes(n) ? "bold" : undefined}
            >
              {n}
            </Text>
          </Center>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SudokuCell;
