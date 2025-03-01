import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import classes from "./FeaturesPage.module.css";
import {
  IconArrowBackUp,
  IconBrush,
  IconBulb,
  IconBulldozer,
  IconCalendarBolt,
  IconCards,
  IconFileAlert,
  IconHourglass,
  IconPalette,
  IconPencilBolt,
  IconStars,
  IconSunMoon,
  IconTrophy,
  IconUsers,
  IconWifiOff,
} from "@tabler/icons-react";

const FEATURES = [
  {
    title: "Daily Challenges",
    description:
      "Take on fresh, unique puzzles every day and keep track of your streaks as you conquer each challenge!",
    icon: IconCalendarBolt,
  },

  {
    title: "Difficulty Levels",
    description:
      "Play puzzles at your perfect level with easy, medium, hard, and expert modes. For the ultimate test, try our exclusive “Master Mode.”",
    icon: IconCards,
  },

  {
    title: "Hints & Tips",
    description:
      "Get hints when you need them and learn new techniques along the way, perfect for improving your skills.",
    icon: IconBulb,
  },

  {
    title: "Personal Stats & Achievements",
    description:
      "Track your best times, completed games, mastered levels, and personal records for a rewarding experience every time you play.",
    icon: IconStars,
  },

  {
    title: "Dark Mode",
    description:
      "Enjoy a sleek, eye-friendly dark mode, ideal for playing at night or saving battery life.",
    icon: IconSunMoon,
  },

  {
    title: "Customizable Themes",
    description:
      "Personalize your Sudoku experience with a selection of beautiful color themes and backgrounds.",
    icon: IconBrush,
  },

  {
    title: "Mistake Limit Option",
    description:
      "Challenge yourself by limiting mistakes per game. Exceed the limit and it’s game over!",
    icon: IconFileAlert,
  },

  {
    title: "Auto-Pencil Mode",
    description:
      "Activate auto-pencil to see possible moves automatically—great for beginners or quick solutions.",
    icon: IconPencilBolt,
  },

  {
    title: "Offline Play",
    description:
      "Play Sudoku anytime, anywhere—even without an internet connection!",
    icon: IconWifiOff,
  },

  {
    title: "Real-Time Leaderboard",
    description:
      "See how you rank against others with our global leaderboards. Compete daily and track your cumulative scores!",
    icon: IconTrophy,
  },

  {
    title: "Puzzle Builder Mode",
    description:
      "Create your own puzzles to share with friends or save for later challenges.",
    icon: IconBulldozer,
  },

  {
    title: "Multiplayer Mode",
    description:
      "Race against friends or random opponents in head-to-head matches to see who can solve the puzzle fastest.",
    icon: IconUsers,
  },

  {
    title: "Undo and Redo Buttons",
    description:
      "Easily correct mistakes or reverse moves with our undo and redo features.",
    icon: IconArrowBackUp,
  },

  {
    title: "Timer Toggle",
    description:
      "Choose to play with or without a timer—perfect for both competitive and relaxed play styles.",
    icon: IconHourglass,
  },

  {
    title: "Color-Coded Notes",
    description:
      "Organize complex puzzles with color-coded notes, making it easier to visualize your next move.",
    icon: IconPalette,
  },
];


const FeaturesPage: React.FC = () => {
  const theme = useMantineTheme();
  const features = FEATURES.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Classic Sudoku, Elevated
      </Title>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Discover a whole new way to enjoy Sudoku with our app that blends
        classic gameplay with modern features to suit players of every level!
        With daily challenges, customizable themes, and both beginner-friendly
        and expert modes, our app is designed to keep you engaged and
        challenged. Track your stats, compete on global leaderboards, or dive
        into multiplayer mode to race friends in real time. Whether you're a
        casual player or a Sudoku master, our app's sleek design, hint options,
        and offline play mean you can enjoy Sudoku anytime, anywhere.
      </Text>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default FeaturesPage;
