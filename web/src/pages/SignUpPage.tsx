import React from "react";
import { useNavigate } from "react-router-dom";
import { SimpleGrid, Title, TextInput, Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useSignUpMutation } from "../graphql";
import AdvancedPasswordInput from "../components/AdvancedPasswordInput";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [signUp, { loading, error }] = useSignUpMutation({
    onCompleted: (data) => {
      navigate(`/signup/confirm?userId=${data.signUp.id}`);
    },
  });
  const form = useForm<FormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    signUp({
      variables: {
        input: {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          password: data.password,
        },
      },
    });
  };

  return (
    <>
      <Title ta="center">Sign Up</Title>
      <Text my="lg" ta="center">
        Create an account to get started!
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <SimpleGrid>
          <TextInput
            disabled={loading}
            label="First Name"
            required
            {...form.getInputProps("firstName")}
          />
          <TextInput
            disabled={loading}
            label="Last Name"
            required
            {...form.getInputProps("lastName")}
          />
          <TextInput
            disabled={loading}
            label="Phone Number"
            type="tel"
            required
            {...form.getInputProps("phone")}
          />
          <TextInput
            disabled={loading}
            label="Email"
            type="email"
            required
            {...form.getInputProps("email")}
          />
          <AdvancedPasswordInput
            disabled={loading}
            label="Password"
            type="password"
            required
            {...form.getInputProps("password")}
          />
        </SimpleGrid>
        {error && <Text c="red">{error.message}</Text>}
        <Button
          loading={loading}
          mt="lg"
          type="submit"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan" }}
          fullWidth
        >
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default SignUpPage;
