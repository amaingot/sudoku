import React from "react";
import { Title, Group, Button } from "@mantine/core";
import { IconGoGame } from "@tabler/icons-react";

const DashboardPage: React.FC = () => {
  return (
    <>
      <Group justify="space-between" mb="sm">
        <Title mb={0}>Dashboard</Title>
        <Group gap="sm">
          <Button rightSection={<IconGoGame />}>New Game</Button>
        </Group>
      </Group>
    </>
  );
};

export default DashboardPage;
