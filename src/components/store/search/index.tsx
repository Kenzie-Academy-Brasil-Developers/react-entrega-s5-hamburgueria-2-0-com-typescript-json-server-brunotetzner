import { Flex, Button } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export const Search = () => {
  return (
    <Flex
      paddingRight="10px"
      paddingLeft="10px"
      justifyContent="space-between"
      flexDirection="row"
      w="345px"
      h="60px"
      bg="gray.0"
      alignItems="center"
      borderRadius="8px"
    >
      <input type="text" placeholder="pesquisa" />
      <Button w="53px" h="40px" bg="green.300" color="gray.0">
        <FaSearch />
      </Button>
    </Flex>
  );
};
