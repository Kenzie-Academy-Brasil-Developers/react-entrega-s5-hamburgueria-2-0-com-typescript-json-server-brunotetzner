import { Button, Flex } from "@chakra-ui/react";
import { Logo } from "./logo";
import { Search } from "../search";
import { IoLogOut } from "react-icons/io5";
import { Cart } from "../cart/index";
export const Header = () => {
  return (
    <Flex
      mw="100%"
      h="12%"
      bg="gray.10"
      marginBottom="1.2%"
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Logo />
      <Flex
        width="40%"
        height="100%"
        justifyContent="space-around"
        alignItems="center"
      >
        <Flex
          height="100%"
          minWidth="30vw"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <Cart />
          <Search />

          <Button fontSize="22px" color="gray.500" bg="gray.10">
            <IoLogOut />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
