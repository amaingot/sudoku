import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppShell,
  Container,
  rem,
  Burger,
  Button,
  Group,
  NavLink,
  Center,
  ButtonProps,
  // Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { link: "/features", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/team", label: "Team" },
  { link: "/contact", label: "Contact" },
];

const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [opened, { toggle, close }] = useDisclosure();

  const topLinks = navLinks.map((link) => (
    <Button
      key={link.label}
      component="a"
      href={link.link}
      onClick={() => navigate(link.link)}
      variant={link.link === location.pathname ? "filled" : "transparent"}
      color="blue"
      size="sm"
    >
      {link.label}
    </Button>
  ));

  const navBarLinks = navLinks.map((link) => (
    <NavLink
      key={link.label}
      ta="center"
      my="md"
      active={link.link === location.pathname}
      onClick={(e) => {
        e.preventDefault();
        close();
        navigate(link.link);
      }}
      href={link.link}
      label={link.label}
      hiddenFrom="sm"
    />
  ));

  const AppButton: React.FC<ButtonProps> = (props) =>
    auth.isAuthenticated ? (
      <Button size="sm" onClick={() => navigate("/app")} {...props}>
        App
      </Button>
    ) : (
      <Button size="sm" onClick={() => auth.login()} {...props}>
        Login
      </Button>
    );

  return (
    <AppShell
      header={{ height: rem(66) }}
      padding="md"
      navbar={{
        width: 0,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: false },
      }}
    >
      <AppShell.Header>
        <Container size="md">
          <Group justify="space-between" p="sm">
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              {/* <Image
                onClick={() => {
                  close();
                  navigate("/");
                }}
                w={rem(160)}
                src={Logo}
                alt="Tennis Shop Guru"
              /> */}
            </Group>
            <Group gap="sm" visibleFrom="sm">
              {topLinks}
              <AppButton />
            </Group>
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section grow>
          {navBarLinks}
          <Center>
            <AppButton m="md" fullWidth hiddenFrom="sm" />
          </Center>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Container>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default PublicLayout;
