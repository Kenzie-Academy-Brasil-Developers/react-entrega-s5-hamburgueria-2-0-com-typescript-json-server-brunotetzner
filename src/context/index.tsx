import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./auth";
import { ProductProvider } from "./store";
import { theme } from "../styles/theme";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <ProductProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ProductProvider>
  </AuthProvider>
);
