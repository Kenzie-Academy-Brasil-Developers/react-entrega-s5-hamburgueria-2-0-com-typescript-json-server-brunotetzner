import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";
export const theme = extendTheme({
  colors: {
    green: {
      100: "#93D7AF",
      300: "#27AE60",
    },

    gray: {
      0: "#ffffff",
      10: "#f5f5f5",
      100: "#E0E0E0",
      500: "#828282",
      1000: "#000000",
    },
    red: {
      600: "#EB5757",
    },
  },
  fonts: {
    body: "Inter",
    heading: "Inter",
  },
  fontSizes: {
    header: "18px",
    text: "16px",
    label: "14px",
    span: "12px",
  },
  styles: {
    global: {
      bg: "#f5f5",
      color: "red.600",
    },
  },
});
