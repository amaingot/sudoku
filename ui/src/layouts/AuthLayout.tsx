import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Paper, Group } from "@mantine/core";

import { useAuth } from "../contexts/AuthContext";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  if (auth.isAuthenticated) {
    navigate("/app");
    return null;
  }

  return (
    <>
      <Group my="xl" justify="center">
        {/* <Image
          w={rem(500)}
          maw="80%"
          src="/img/frontpageLogo.png"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        /> */}
      </Group>
      <Container mt="xl" size="xs">
        <Paper>
          <Outlet />
        </Paper>
      </Container>
    </>
  );
};

export default AuthLayout;
