import React from "react";
import {
  Image,
  Text,
  Container,
  ThemeIcon,
  Title,
  SimpleGrid,
} from "@mantine/core";
import classes from "./TeamPage.module.css";

const data = [
  {
    title: "Alex",
    description: "Cool guy who does engineering stuff.",
  },
];

const TeamPage: React.FC = () => {
  const items = data.map((item) => (
    <div className={classes.item} key={item.title}>
      <ThemeIcon
        variant="light"
        className={classes.itemIcon}
        size={60}
        radius="md"
      >
        <Image src="/cool_person.svg" />
      </ThemeIcon>

      <div>
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text c="dimmed">{item.description}</Text>
      </div>
    </div>
  ));

  return (
    <Container size={700} className={classes.wrapper}>
      <Text className={classes.supTitle}>Sudoku Team</Text>

      <Title className={classes.title} order={2}>
        Meet Our Team: <span className={classes.highlight}>Innovators</span> at
        the Forefront of Sudoku Technology
      </Title>

      <Container size={660} p={0} my="xl">
        <Text c="dimmed" className={classes.description}>
          Our passionate team is dedicated to creating the ultimate Sudoku
          experience for players of all levels. With backgrounds in software
          development, game design, and a shared love for puzzles, we bring
          together creativity and technical expertise to build an app that’s
          both engaging and intuitive. Driven by a commitment to quality and
          user experience, we focus on adding thoughtful features and design
          elements that make each game feel rewarding. We believe that Sudoku
          should be fun, accessible, and challenging, and we're thrilled to
          share this app with puzzle lovers everywhere.
        </Text>
      </Container>

      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50} mt={30}>
        {items}
      </SimpleGrid>
    </Container>
  );
};

export default TeamPage;
