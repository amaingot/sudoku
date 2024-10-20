import React from "react";
import { Title, Text } from "@mantine/core";

const SignUpSuccessPage: React.FC = () => {
  return (
    <>
      <Title ta="center">Congrats!</Title>
      <Text mt="xl" ta="center">
        Please check your email inbox for a link to confirm your account!
      </Text>
    </>
  );
};

export default SignUpSuccessPage;
