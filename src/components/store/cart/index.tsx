import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Flex,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import { BsFillCartFill } from "react-icons/bs";
import { CartCard } from "./cardCart";
import { useProductsAndCart } from "../../../context/store";

export const Cart = () => {
  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();

  const { cart, removeFromCart } = useProductsAndCart();

  let finalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    finalPrice += cart[i].price;
  }

  const cleanCard = () => {
    const ids = cart.map((product) => product.id);
    for (let i = 0; i < cart.length; i++) {
      removeFromCart(ids[i]);
    }
  };
  return (
    <>
      <Button
        onClick={onCartOpen}
        fontSize="22px"
        color="gray.500"
        bg="gray.10"
      >
        <BsFillCartFill />
      </Button>
      <Modal isOpen={isCartOpen} onClose={onCartClose}>
        <ModalOverlay />

        <ModalContent>
          <Flex flexDirection="column">
            <Center
              bg="green.300"
              h="54px"
              fontSize="header"
              fontWeight="700"
              color="gray.0"
              marginBottom="10px"
            >
              Carrinho de Compras
            </Center>
            {cart.map((product) => (
              <CartCard
                name={product.name}
                image={product.img}
                id={product.id}
              />
            ))}
            <Flex w="96%">
              <Flex
                fontSize="text"
                w="100%"
                ml="16px"
                justifyContent="space-between"
                borderTop="1px solid"
                borderColor="gray.300"
                paddingTop="12px"
                paddingBottom="12px"
              >
                <b>Total:</b>
                <Text>R${finalPrice.toFixed(2)}</Text>
              </Flex>
            </Flex>
            <Button
              onClick={cleanCard}
              _hover={{ background: "green.300" }}
              ml="12px"
              w="94.5%"
              color="gray.500"
              mb="12px"
            >
              Remover todos
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
