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
    title: "Alex Maingot",
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
      <Text className={classes.supTitle}>Tennis Shop Guru Team</Text>

      <Title className={classes.title} order={2}>
        Meet Our Team: <span className={classes.highlight}>Innovators</span> at
        the Forefront of Tennis Shop Technology
      </Title>

      <Container size={660} p={0} my="xl">
        <Text c="dimmed" className={classes.description}>
          Meet the dedicated team behind Tennis Shop Guru, a group of passionate
          professionals committed to revolutionizing the way tennis shop owners
          manage their businesses. With a diverse range of expertise spanning
          software development, customer service, and tennis industry knowledge,
          our team is driven by a shared vision of empowering tennis
          entrepreneurs with innovative solutions. Get to know the faces behind
          our success and discover how our collective experience drives every
          aspect of Tennis Shop Guru's mission to elevate the tennis retail
          experience.
        </Text>
      </Container>

      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50} mt={30}>
        {items}
      </SimpleGrid>
    </Container>
  );
};

export default TeamPage;
