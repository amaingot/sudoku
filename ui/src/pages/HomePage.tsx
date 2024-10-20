import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Text, Button, Group } from "@mantine/core";
import classes from "./HomePage.module.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title}>
          Serve up
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            {" "}
            success
          </Text>
          ,<br />
          One{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            string
          </Text>{" "}
          at a time
        </h1>

        <Text className={classes.description} color="dimmed">
          Your all-in-one cloud solution for effortlessly managing string jobs
          and employee schedules. Simplify operations and boost efficiency in
          your tennis shop today!
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            onClick={() => navigate("/signup")}
          >
            Get started
          </Button>
        </Group>
      </Container>
    </div>
  );
};

export default HomePage;
