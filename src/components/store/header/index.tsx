import { Button, Flex, Center } from "@chakra-ui/react";
import { Logo } from "./logo";
import { Search } from "../search";
import { IoLogOut } from "react-icons/io5";
import { Cart } from "../cart/index";
import { useAuth } from "../../../context/auth";
import { useProductsAndCart } from "../../../context/store";

export const Header = () => {
  const { cart } = useProductsAndCart();
  const { logOut } = useAuth();

  let totalProducts = 0;
  for (let i = 0; i < cart.length; i++) {
    totalProducts += 1 * cart[i].quantity;
  }
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
          <Center position="relative">
            <Cart />
            <Center
              height="18px"
              borderRadius="10px"
              bg="green.300"
              color="gray.0"
              paddingLeft="2px"
              paddingRight="2px"
              position="absolute"
              left="35px"
              bottom="20px"
            >
              {totalProducts}
            </Center>
          </Center>
          <Search />

          <Button
            fontSize="22px"
            color="gray.500"
            bg="gray.10"
            onClick={logOut}
          >
            <IoLogOut />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
