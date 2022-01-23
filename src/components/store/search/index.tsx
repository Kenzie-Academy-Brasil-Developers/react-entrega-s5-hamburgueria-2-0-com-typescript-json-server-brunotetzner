import {
  Flex,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useProductsAndCart } from "../../../context/store";
import { useState } from "react";

export const Search = () => {
  const { filterProducts } = useProductsAndCart();
  const [inputValue, setInputValue] = useState<string>("");

  const buttonClick = () => {
    filterProducts(inputValue);
    setInputValue("");
  };
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();
  return (
    <>
      <Modal isOpen={isSearchOpen} onClose={onSearchClose}>
        <ModalOverlay />
        <ModalContent>
          <Flex
            paddingRight="10px"
            paddingLeft="10px"
            justifyContent="space-between"
            flexDirection="row"
            w="100%"
            h="60px"
            bg="gray.0"
            alignItems="center"
            borderRadius="8px"
          >
            <Input
              type="text"
              placeholder="pesquisa por categoria"
              onChange={(evt) => setInputValue(evt.target.value)}
              width="400px"
            />
            <Button
              onClick={buttonClick}
              w="53px"
              h="40px"
              bg="green.300"
              color="gray.0"
            >
              <FaSearch />
            </Button>
          </Flex>
        </ModalContent>
      </Modal>

      <Button
        onClick={onSearchOpen}
        w="53px"
        h="40px"
        bg="gray.10"
        color="gray.500"
      >
        <FaSearch />
      </Button>
    </>
  );
};
