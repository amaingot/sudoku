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
          Your
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            {" "}
            Ultimate
          </Text>
          ,<br />
          Free{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Sudoku
          </Text>{" "}
          Experience Awaits
        </h1>

        <Text className={classes.description} color="dimmed">
          Master the Puzzle, Anytime, Anywhere!
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
