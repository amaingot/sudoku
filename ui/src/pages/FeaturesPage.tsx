import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconHistory,
  IconDeviceMobileMessage,
  IconClock,
  IconTallymarks,
  IconBallTennis,
  IconReportAnalytics,
} from "@tabler/icons-react";
import classes from "./FeaturesPage.module.css";

const mockdata = [
  {
    title: "Customer Racket String Job History",
    description:
      "Keep track of your customers' racket stringing preferences and history effortlessly. Tennis Shop Guru allows you to maintain detailed records of string jobs for each customer, ensuring personalized service and accurate recommendations for future stringing.",
    icon: IconHistory,
  },
  {
    title: "Customer SMS Notifications",
    description:
      "Enhance communication with your customers by providing real-time updates on their stringing jobs via SMS notifications. Keep them informed about the status of their racket, ensuring a seamless and transparent experience.",
    icon: IconDeviceMobileMessage,
  },
  {
    title: "Employee Hours Tracker",
    description:
      "Efficiently manage your staff's time with our intuitive employee hours tracker. Easily record work shifts, track attendance, and generate comprehensive time cards, simplifying payroll processing and ensuring accountability.",
    icon: IconClock,
  },
  {
    title: "Employee String Job Tracker",
    description:
      "Empower tennis shop owners with insights into employee performance and productivity. Our string job tracker allows you to monitor the number of string jobs completed by each employee, facilitating fair compensation and optimizing workflow management.",
    icon: IconTallymarks,
  },
  {
    title: "Court Reservations",
    description:
      "Simplify court management and reservation processes with Tennis Shop Guru. Enable customers to book courts online seamlessly, manage reservations efficiently, and maximize court utilization, enhancing overall customer satisfaction and revenue generation.",
    icon: IconBallTennis,
  },
  {
    title: "Reporting",
    description:
      "Gain valuable insights into your tennis shop's performance with robust reporting capabilities. Tennis Shop Guru provides comprehensive reports on stringing jobs, employee productivity, court utilization, and more, empowering you to make informed business decisions and drive growth.",
    icon: IconReportAnalytics,
  },
];

const FeaturesPage: React.FC = () => {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
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
        Your Tennis Shop, Simplified
      </Title>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Tennis Shop Guru offers a comprehensive suite of features designed to
        streamline operations and enhance customer satisfaction for tennis shop
        owners. Whether you're managing customer string jobs, coordinating court
        reservations, or monitoring employee productivity, Tennis Shop Guru has
        you covered. Explore our key features below:
      </Text>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default FeaturesPage;
