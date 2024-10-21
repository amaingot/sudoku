import React from "react";
import { Title, Text, Button } from "@mantine/core";
import { useAuth } from "../contexts/AuthContext";

const SignUpSuccessPage: React.FC = () => {
  const auth = useAuth();

  return (
    <>
      <Title ta="center">Congrats!</Title>
      <Text mt="xl" ta="center">
        You've confirmed your account. Now it is time to log in and start
        playing games!
      </Text>
      <Button
        fullWidth
        mt="lg"
        size="xl"
        color="green"
        onClick={() => auth.login("/app")}
      >
        Log in
      </Button>
    </>
  );
};

export default SignUpSuccessPage;
