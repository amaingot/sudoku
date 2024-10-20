import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
  List,
  Button,
  Box,
  Group,
} from "@mantine/core";
import { IconAward, IconTrophy } from "@tabler/icons-react";
import classes from "./FeaturesPage.module.css";

const plans = [
  {
    title: "Basic Plan",
    description:
      "The Basic Plan is tailored for smaller tennis shops or those just starting out. It focuses on providing the essential tools needed for efficient operation without overwhelming users with complex features they may not need. This plan includes:",
    features: [
      "Customer Tennis Racket String Job History: Track the stringing history for each customer to offer personalized service and recommendations.",
      "Employee Hours Tracker: A simple solution for recording and managing employee work hours and shifts.",
      "Basic Reporting: Access to standard reports on sales, string jobs completed, and basic employee productivity metrics. This could help in understanding the shop's performance on a fundamental level.",
    ],
    icon: IconAward,
    monthly: 15,
    yearly: 150,
  },
  {
    title: "Pro Plan",
    description:
      "The Pro Plan is designed for established shops that require a broader set of tools and more detailed analytics to optimize their operations. In addition to all the features included in the Basic Plan, the Pro Plan offers:",
    features: [
      "Advanced Employee String Job Tracker: Detailed tracking of each string job by employee, including time taken and materials used, facilitating accurate payroll and performance incentives.",
      "Court Reservations: Integration of a court reservation system, allowing customers to book courts directly through the shop, which could also include features like reservation management, cancellation policies, and advanced booking options.",
      "Enhanced Reporting: Advanced reporting capabilities, offering deeper insights into financial performance, detailed customer behavior analytics, employee efficiency, inventory management, and more. Custom reports and analytics could also be a part of this package.",
      "Inventory Management: For shops that also sell tennis gear and equipment, this feature would help track stock levels, manage orders, and analyze sales trends.",
      "Custom SMS Notifications: Beyond basic notifications, this could include marketing messages, reminders for upcoming reservations or promotions, and personalized greetings or offers.",
    ],
    icon: IconTrophy,
    monthly: 30,
    yearly: 300,
  },
];

const PricingPage: React.FC = () => {
  const navigate = useNavigate();

  const theme = useMantineTheme();
  const planCards = plans.map((plan) => (
    <Card key={plan.title} shadow="md" radius="md" padding="xl">
      <Box style={{ flexGrow: 1 }}>
        <Group justify="space-between">
          <div>
            <plan.icon
              style={{ width: rem(50), height: rem(50) }}
              stroke={2}
              color={theme.colors.blue[6]}
            />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
              {plan.title}
            </Text>
          </div>
          <div>
            <Text fz="xl" fw={500} c="blue" mt="md">
              ${plan.monthly} / month
            </Text>
            <Text ta="center" c="dimmed">
              or
            </Text>
            <Text fz="xl" fw={500} c="blue">
              ${plan.yearly} / year
            </Text>
          </div>
        </Group>
        <Text fz="sm" mt="sm">
          {plan.description}
        </Text>
        <List>
          {plan.features.map((item, index) => (
            <List.Item fz="sm" key={`${index}`} mt="sm">
              {item}
            </List.Item>
          ))}
        </List>
      </Box>
      <Box>
        <Button mt="md" fullWidth onClick={() => navigate("/signup")}>
          Get Started
        </Button>
      </Box>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Pricing
      </Title>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Tennis Shop Guru's offering of two distinct plans, Basic and Pro, is
        designed to cater to a range of tennis shop sizes and needs, from
        smaller operations that require fundamental management tools to larger
        shops looking for advanced features and customization. Here's a detailed
        description of what each plan could offer:
      </Text>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" mt={50}>
        {planCards}
      </SimpleGrid>
    </Container>
  );
};

export default PricingPage;
