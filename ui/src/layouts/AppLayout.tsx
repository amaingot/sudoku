import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  NavLink,
  AppShell,
  Burger,
  Button,
  Group,
  rem,
  Text,
  Box,
  Title,
  // Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDeviceGamepad,
  IconHome2,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";

import { WebsocketProvider } from "../contexts/WebsocketContext";
import { useAuth } from "../contexts/AuthContext";

const links = [
  {
    link: "/app",
    label: "Home",
    icon: <IconHome2 />,
  },
  {
    link: "/app/games",
    label: "Games",
    icon: <IconDeviceGamepad />,
  },
  {
    link: "/app/settings",
    label: "Settings",
    icon: <IconSettings />,
  },
] as const;

const HEADER_HEIGHT = rem(60);
const NAVBAR_WIDTH = rem(200);

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [opened, { toggle }] = useDisclosure();

  const items = links.map((link) => (
    <NavLink
      key={link.link}
      href={link.link}
      leftSection={link.icon}
      mt="md"
      active={location.pathname === link.link}
      onClick={(event) => {
        event.preventDefault();
        if (opened) {
          toggle();
        }
        navigate(link.link);
      }}
      label={link.label}
    />
  ));

  if (!auth.isAuthenticated) {
    auth.login(`${location.pathname}${location.search}`);
    return <></>;
  }

  return (
    <WebsocketProvider>
      <AppShell
        header={{ height: HEADER_HEIGHT }}
        navbar={{
          width: NAVBAR_WIDTH,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header
          bg="var(--mantine-color-blue-9)"
          style={{ color: "white" }}
        >
          <Group justify="space-between" h="100%" px="lg">
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
                color="white"
              />
              <Title
                order={3}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  close();
                  navigate("/");
                }}
              >
                Sudoku
              </Title>
              {/* <Image
                onClick={() => {
                  close();
                  navigate("/");
                }}
                w={rem(180)}
                src={Logo}
                alt="Sudoku"
              /> */}
            </Group>
            <Group visibleFrom="sm">
              <Text>
                {auth.user?.given_name} {auth.user?.family_name}
              </Text>
              <Button
                color="blue"
                size="xs"
                onClick={() => auth.logout()}
                rightSection={<IconLogout />}
              >
                Logout
              </Button>
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar bg="white">
          <AppShell.Section grow>{items}</AppShell.Section>
          <AppShell.Section>
            <Box p="md" hiddenFrom="sm">
              <Text ta="center" my="sm">
                {auth.user?.given_name} {auth.user?.family_name}
              </Text>
              <Button
                mt="sm"
                fullWidth
                color="blue"
                size="xs"
                onClick={() => auth.logout()}
                rightSection={<IconLogout />}
              >
                Logout
              </Button>
            </Box>
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main bg="var(--mantine-color-gray-1)">
          <Box
            p="sm"
            mih={`calc(100vh - ${HEADER_HEIGHT})`}
            mah={`calc(100vh - ${HEADER_HEIGHT})`}
            style={{ overflowY: "auto" }}
          >
            <Outlet />
          </Box>
        </AppShell.Main>
      </AppShell>
    </WebsocketProvider>
  );
};

export default AppLayout;
