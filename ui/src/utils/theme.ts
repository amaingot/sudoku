import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },
  components: {
    SimpleGrid: {
      defaultProps: {
        cols: {
          sm: 1,
          md: 2,
        },
      },
    },
    Title: {
      defaultProps: {
        // mb: "md",
      },
    },
    Paper: {
      defaultProps: {
        shadow: "lg",
        p: "lg",
        radius: "lg",
        withBorder: true,
      },
    },
    Button: {
      defaultProps: {
        variant: "filled",
        color: "var(--mantine-color-green-8)",
      },
    },
    Table: {
      defaultProps: {
        stickyHeader: true,
        highlightOnHover: true,
      },
    },
  },
});
