import { Flex, Heading } from "@chakra-ui/react";
import { Header } from "../../components/store/header";
import { useProductsAndCart } from "../../context/store";
import { Card } from "../../components/store/card";
interface product {
  id?: number;
  userId?: number;
  name: string;
  category: string;
  price: number;
  img: string;
}
export const Store = () => {
  const { products, filteredProducts, cart } = useProductsAndCart();
  return (
    <Flex maxWidth="100vw" h="100vh" flexDirection="column">
      <Header />
      <Flex w="100%" h="90%" flexWrap="wrap" justifyContent="space-around">
        {!filteredProducts.length
          ? products.map((product) => <Card product={product} />)
          : filteredProducts.map((product) => <Card product={product} />)}
      </Flex>
    </Flex>
  );
};
