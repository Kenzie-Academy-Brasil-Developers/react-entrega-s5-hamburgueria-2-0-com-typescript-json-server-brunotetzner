import { useForm } from "react-hook-form";
import { Flex, Grid, Text, Button, Heading, Center } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/auth";
import { Input } from "../../components/form/input";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { LogoForm } from "../../components/form/logoForm";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BsFillCartFill, BsFillPeopleFill, BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
interface FormData {
  email: string;
  password: string;
  confirmpassword: string;
  name: string;
}

const SignInSchema = yup.object().shape({
  email: yup.string().required("email obrigátorio").email("email invalido"),
  password: yup.string().required("senha obrigatória"),
  confirmpassword: yup
    .string()
    .required("campo obrigatório")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
  name: yup.string().required("nome obrigatório"),
});

export const SignUp = () => {
  const { signUp } = useAuth();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({ resolver: yupResolver(SignInSchema) });

  const handleSignIn = (data: FormData) => {
    signUp(data);
  };
  return (
    <Flex
      maxWidth="100vw"
      maxHeight="100vh"
      flexDirection={["column", "column", "column", "row"]}
      bg="gray.0"
    >
      <Flex
        w={["100%", "100%", "100%", "50%"]}
        h={["35%", "35%", "35%", "80%"]}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Flex
          w={["100%", "100%", "100%", "70%"]}
          h="70%"
          ml="auto"
          mr={["0", "0", "0", "2%"]}
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
      <Flex
        w={["100%", "100%", "100%", "50%"]}
        h="90%"
        justifyContent="center"
        alignItems="center"
        mt="2.5%"
      >
        <Grid
          onSubmit={handleSubmit(handleSignIn)}
          as="form"
          w={["90", "70%", "40%", "60%"]}
          h="100%"
          mr={["0", "0", "0", "auto"]}
          display="flex"
          flexDirection="column"
          ml={["0", "0", "0%", "2%"]}
          padding="2%"
          border="1px solid"
          borderColor="gray.100"
        >
          <Flex flexDirection="row" justifyContent="space-between">
            <Heading fontSize="header">Cadastro</Heading>
            <Text
              fontSize="label"
              color="gray.500"
              borderBottom="1px solid"
              borderColor="gray.500"
            >
              <Link to="/">Retornar para o Login</Link>
            </Text>
          </Flex>
          <Input
            label="email"
            placeholder="email"
            type="email"
            error={errors.email}
            icon={FaEnvelope}
            {...register("email")}
          />
          <Input
            label="nome"
            placeholder="nome"
            type="name"
            error={errors.name}
            icon={BsFillPeopleFill}
            {...register("name")}
          />
          <Input
            label="senha"
            placeholder="senha"
            type="password"
            error={errors.password}
            icon={FaLock}
            {...register("password")}
          />

          <Input
            label="Confirmar senha"
            placeholder="Confirmar senha"
            type="confirmpassword"
            error={errors.confirmpassword}
            icon={FaLock}
            {...register("confirmpassword")}
          />

          <Button
            marginTop="20px"
            height="60px"
            background="gray.200"
            color="gray.500"
            type="submit"
            _hover={{ background: "green.300" }}
          >
            Cadastrar
          </Button>
        </Grid>
      </Flex>
    </Flex>
  );
};
