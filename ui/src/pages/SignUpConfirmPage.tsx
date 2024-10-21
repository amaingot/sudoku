import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Title, Text, Button, PinInput, Center } from "@mantine/core";
import { useConfirmSignUpMutation } from "../graphql";

const SignUpConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const userId = search.get("userId") || "";
  const [code, setCode] = React.useState(search.get("code") || "");
  const [error, setError] = React.useState<string | undefined>(undefined);

  const [confirmSignUp, { loading }] = useConfirmSignUpMutation();

  const handleSubmit = async () => {
    setError(undefined);
    try {
      await confirmSignUp({ variables: { input: { userId, code } } });
      navigate("/signup/success");
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        setError(error?.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <Title ta="center">Confirm your account</Title>
      <Text ta="center">
        Please check your email for a confirmation code and enter it below.
      </Text>
      <Center>
        <PinInput
          disabled={loading}
          length={6}
          value={code}
          onChange={setCode}
          mt="lg"
          size="xl"
          error={!!error}
          type="number"
        />
      </Center>
      {error && <Text c="red">{error}</Text>}
      <Button
        loading={loading}
        fullWidth
        mt="lg"
        size="xl"
        color="green"
        onClick={handleSubmit}
      >
        Confirm Account!
      </Button>
    </>
  );
};

export default SignUpConfirmPage;
