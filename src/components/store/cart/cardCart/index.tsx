import { useProductsAndCart } from "../../../../context/store";
import { Flex, Image, Button, Heading, Center, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
interface product {
  id: number;
  userId?: number;
  name: string;
  category: string;
  price: number;
  img: string;
  quantity: number;
}
interface cartProps {
  product: product;
}

export const CartCard = ({ product }: cartProps) => {
  const { removeFromCart, addOneProduct, removeOneProduct } =
    useProductsAndCart();

  return (
    <Flex flexDirection="row" justifyContent="flex-start" ml="17px" mb="17px">
      <Center w="80px" h="80px" bg="gray.100" borderRadius="5px">
        <Image src={product.img} />
      </Center>

      <Flex ml="10px" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="header">{product.name}</Heading>
        <Center
          marginTop="28px"
          border="2px solid"
          borderColor="gray.200"
          borderRadius="10px"
        >
          <Button
            color="red.600"
            h="25px"
            maxWidth="25px"
            onClick={() => addOneProduct(product)}
          >
            +
          </Button>
          <Text ml="10px" mr="10px ">
            {product.quantity}
          </Text>
          <Button
            color="red.600"
            h="25px"
            maxWidth="25px"
            onClick={() => removeOneProduct(product)}
          >
            -
          </Button>
        </Center>
      </Flex>

      <Button
        bg="gray.0"
        color="gray.300"
        ml="auto"
        mr="5px"
        onClick={() => removeFromCart(product.id)}
      >
        <FaTrash />
      </Button>
    </Flex>
  );
};
