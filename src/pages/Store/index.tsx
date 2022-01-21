import { Flex, Heading } from "@chakra-ui/react";
import { Header } from "../../components/store/header";
// import { useProductsAndCart } from "../../context/store";

interface product {
  id?: number;
  userId?: number;
  productId: number;
  name: string;
  category: string;
  price: number;
  img: string;
}
export const Store = () => {
  // const { products, getFilteredProducts } = useProductsAndCart();
  // console.log(products);
  return (
    <Flex w="100vw" h="100vh" flexDirection="column">
      <Header />
    </Flex>
  );
};
