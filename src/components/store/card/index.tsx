import { Heading, Flex, Text, Image, Button } from "@chakra-ui/react";
import { useProductsAndCart } from "../../../context/store";
import { useAuth } from "../../../context/auth";
interface product {
  id: number;
  userId?: number;
  name: string;
  category: string;
  price: number;
  img: string;
}
interface productData {
  product: product;
}

export const Card = ({ product }: productData) => {
  const { addToCart } = useProductsAndCart();
  const { user } = useAuth();
  product.userId = user.id;
  return (
    <Flex
      borderRadius="5px"
      width="300px"
      h="346px"
      minHeight="346hpx"
      flexDirection="column"
      border="2px solid"
      borderColor="gray.100"
      paddingBottom="23px"
      margin="1.2%"
      justifyContent="space-between"
      _hover={{ borderColor: "green.300" }}
    >
      <Flex
        w="100%"
        h="150px"
        justifyContent="center"
        alignItems="center"
        background="gray.10"
      >
        <Image maxWidth="177px" maxHeight="177px" src={product.img} />
      </Flex>

      <Heading
        marginTop="26.6px"
        marginLeft="21px"
        fontSize="fontSizes.header"
        color="gray.1000"
      >
        {product.name}
      </Heading>
      <Text marginLeft="21px" fontSize="span" color="gray.500">
        {product.category}
      </Text>
      <Text marginLeft="21px" fontSize="label" color="green.300">
        Preço: R${product.price.toFixed(2)}
      </Text>
      <Button
        marginLeft="21px"
        w="106px"
        h="40px"
        color="gray.0"
        backgroundColor="gray.300"
        _hover={{ backgroundColor: "green.300" }}
        onClick={() => addToCart(product)}
      >
        Comprar
      </Button>
    </Flex>
  );
};
