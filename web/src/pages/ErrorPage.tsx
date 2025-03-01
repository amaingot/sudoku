import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Title, Text, Button, Container, Group } from "@mantine/core";
import classes from "./ErrorPage.module.css";

interface Props {
  errorHeadline?: string;
  errorTitle?: string;
  errorDescription?: string;
}

const ErrorPage: React.FC<Props> = (props) => {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const errorHeadline =
    search.get("errorHeadline") || props.errorHeadline || "Error";
  const errorTitle =
    search.get("errorTitle") ||
    props.errorTitle ||
    "An unexpected error has occurred";
  const errorDescription =
    search.get("errorDescription") ||
    props.errorDescription ||
    "Please try again later or visit our help center.";

  return (
    <Container className={classes.root}>
      <div className={classes.label}>{errorHeadline}</div>
      <Title className={classes.title}>{errorTitle}</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        {errorDescription}
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" onClick={() => navigate("/")}>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
};

export default ErrorPage;
