import React from "react";
import {
  SimpleGrid,
  Group,
  Switch,
  Flex,
  SegmentedControl,
  Button,
  SegmentedControlItem,
} from "@mantine/core";
import { useElementSize, useHotkeys } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";

import { SudokuGameFragment } from "../graphql";
import SudokuCell from "./SudokuCell";

interface Props {
  gameId: string;
  board: SudokuGameFragment["board"];
  w?: number | string;
}

const SudokuBoard: React.FC<Props> = ({ gameId, board, w }) => {
  const [notesMode, setNotesMode] = React.useState(false);
  const [touchMode, setTouchMode] = React.useState(false);
  const [selectedNumber, setSelectedNumber] = React.useState<
    number | undefined
  >(undefined);
  const { ref, width } = useElementSize();
  
  useHotkeys([
    ["1", () => setSelectedNumber(1)],
    ["2", () => setSelectedNumber(2)],
    ["3", () => setSelectedNumber(3)],
    ["4", () => setSelectedNumber(4)],
    ["5", () => setSelectedNumber(5)],
    ["6", () => setSelectedNumber(6)],
    ["7", () => setSelectedNumber(7)],
    ["8", () => setSelectedNumber(8)],
    ["9", () => setSelectedNumber(9)],
    ["0", () => setSelectedNumber(undefined)],
    ["n", () => setNotesMode((v) => !v)],
    ["t", () => setTouchMode((v) => !v)],
  ]);

  const numberOptions = React.useMemo(() => {
    const numberCounts = board.flat().reduce((acc, cell) => {
      if (cell.number) {
        acc[cell.number] = (acc[cell.number] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);
    const options: SegmentedControlItem[] = [];
    for (let i = 1; i <= 9; i++) {
      if (numberCounts[i] === undefined || numberCounts[i] < 9) {
        options.push({
          value: i.toString(),
          label: i.toString(),
          disabled: false,
        });
      } else {
        options.push({
          value: i.toString(),
          label: i.toString(),
          disabled: true,
        });
      }
    }
    return options;
  }, [board]);

  return (
    <Flex w={w || "100%"} maw="100%" direction="column" gap="sm">
      <Group justify="right" mih={22}>
        {selectedNumber && (
          <Button
            size="compact-xs"
            variant="transparent"
            color="gray"
            leftSection={<IconX />}
            onClick={() => setSelectedNumber(undefined)}
          >
            Clear
          </Button>
        )}
        <Switch
          checked={notesMode}
          onChange={(e) => setNotesMode(e.currentTarget.checked)}
          label="Notes"
        />
        <Switch
          checked={touchMode}
          onChange={(e) => setTouchMode(e.currentTarget.checked)}
          label="Touch"
        />
      </Group>
      <SegmentedControl
        fullWidth
        // @ts-expect-error - value is not compatible with SegmentControl
        value={selectedNumber ? selectedNumber.toString() : null}
        onChange={(value) => setSelectedNumber(parseInt(value))}
        data={numberOptions}
      />
      <SimpleGrid ref={ref} w="100%" cols={9} spacing={0}>
        {board.map((row, x) =>
          row.map((cell, y) => {
            if (cell.x !== x || cell.y !== y) {
              console.log(cell.x, x, cell.y, y);
            }

            return (
              <SudokuCell
                key={`${x},${y}`}
                size={width / 9}
                cell={cell}
                selectedNumber={selectedNumber}
                notesMode={notesMode}
                touchMode={touchMode}
                gameId={gameId}
              />
            );
          })
        )}
      </SimpleGrid>
    </Flex>
  );
};

export default SudokuBoard;
