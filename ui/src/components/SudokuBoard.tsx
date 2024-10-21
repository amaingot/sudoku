import React from "react";
import { SudokuGameFragment } from "../graphql";
import {
  SimpleGrid,
  Group,
  Switch,
  Flex,
  SegmentedControl,
  Button,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import SudokuCell from "./SudokuCell";
import { IconX } from "@tabler/icons-react";

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

  return (
    <Flex w={w || "100%"} direction="column" gap="sm">
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
        data={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
      />
      <SimpleGrid ref={ref} w={w || "100%"} cols={9} spacing={0}>
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
