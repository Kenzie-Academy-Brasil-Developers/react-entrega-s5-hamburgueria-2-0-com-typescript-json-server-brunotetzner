import { useForm } from "react-hook-form";
import { Flex, Grid, Text, Button, Heading, Center } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/auth";
import { useHistory } from "react-router";
import { Input } from "../../components/form/input";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { LogoForm } from "../../components/form/logoForm";
import { RiShoppingBag3Line } from "react-icons/ri";
interface FormData {
  email: string;
  password: string;
}

const SignInSchema = yup.object().shape({
  email: yup.string().required("email obrigátorio").email("email invalido"),
  password: yup.string().required("senha obrigatória"),
});

export const Login = () => {
  const { signIn } = useAuth();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({ resolver: yupResolver(SignInSchema) });

  const history = useHistory();

  const handleSignIn = (data: FormData) => {
    signIn(data);
  };
  return (
    <Flex
      w="100vw"
      h="100vh"
      flexDirection={[
        "column-reverse",
        "column-reverse",
        "column-reverse",
        "row",
      ]}
      bg="gray.0"
    >
      <Flex
        w={["100%", "100%", "100%", "50%"]}
        h="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          onSubmit={handleSubmit(handleSignIn)}
          as="form"
          w={["90", "70%", "40%", "60%"]}
          h="70%"
          ml={["0", "0", "0", "auto"]}
          alignItems="center"
          mr={["0", "0", "0%", "2%"]}
          padding="2%"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading fontSize="header" color="gray.1000">
            Login
          </Heading>
          <Input
            placeholder="email"
            type="email"
            label="email"
            error={errors.email}
            icon={FaEnvelope}
            {...register("email")}
          />

          <Input
            placeholder="senha"
            type="password"
            label="senha"
            error={errors.password}
            icon={FaLock}
            {...register("password")}
          />
          <Button
            marginTop="20px"
            height="60px"
            bg="green.600"
            color="gray.0"
            type="submit"
          >
            Logar
          </Button>
          <Text fontSize="label" color="gray.300">
            Crie sua conta para saborear muitas delícias e matar sua fome!
          </Text>
          <Button
            marginTop="20px"
            height="60px"
            bg="gray.10"
            color="gray.500"
            onClick={() => history.push("/signup")}
          >
            cadastrar
          </Button>
        </Grid>
      </Flex>
      <Flex
        w={["100%", "100%", "100%", "50%"]}
        h={["35%", "35%", "35%", "80%"]}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Flex
          w={["100%", "100%", "100%", "70%"]}
          h="70%"
          mr="auto"
          ml={["0", "0", "0", "2%"]}
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          paddingTop={["8%", "8%", "8%", "20%"]}
        >
          <Flex mr={["0", "2", "0", "2%"]}>
            <LogoForm />
          </Flex>
          <Flex
            w={["90%", "350px", "350px", "350px"]}
            border="1px solid"
            borderColor="gray.100"
            borderRadius="10px"
            padding="4px"
          >
            <Center
              minWidth="60px"
              h="60px"
              borderRadius="5px"
              bg="green.100"
              color="green.300"
            >
              <RiShoppingBag3Line />
            </Center>
            <Text color="gray.300" fontSize="span" ml="10px">
              A vida é como um sanduíche, é preciso recheá-la com os
              <b> melhores</b>
              <br />
              ingredientes.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
