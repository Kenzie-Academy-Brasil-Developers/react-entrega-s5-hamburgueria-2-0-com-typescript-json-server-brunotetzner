import { useProductsAndCart } from "../../../../context/store";
import { Flex, Image, Button, Heading, Center } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
interface cartProps {
  name: string;
  image: string;
  id: number;
}
export const CartCard = ({ name, image, id }: cartProps) => {
  const { removeFromCart } = useProductsAndCart();
  return (
    <Flex flexDirection="row" justifyContent="flex-start" ml="17px" mb="17px">
      <Center w="80px" h="80px" bg="gray.100" borderRadius="5px">
        <Image src={image} />
      </Center>
      <Heading ml="10px" fontSize="header">
        {name}
      </Heading>
      <Button
        bg="gray.0"
        color="gray.300"
        ml="auto"
        mr="5px"
        onClick={() => removeFromCart(id)}
      >
        <FaTrash />
      </Button>
    </Flex>
  );
};
