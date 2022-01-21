import { Button, Flex } from "@chakra-ui/react";
import { Logo } from "./logo";
import { Search } from "../search";
import { BsFillCartFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";

export const Header = () => {
  return (
    <Flex
      mw="100%"
      h="12%"
      bg="gray.10"
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
        <Search />
        <Button fontSize="22px" color="gray.500" bg="gray.10">
          <BsFillCartFill />
        </Button>
        <Button fontSize="22px" color="gray.500" bg="gray.10">
          <IoLogOut />
        </Button>
      </Flex>
    </Flex>
  );
};
