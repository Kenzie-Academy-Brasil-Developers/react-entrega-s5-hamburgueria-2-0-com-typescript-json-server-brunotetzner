import { useForm } from "react-hook-form";
import { Flex, Grid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/auth";
import { useHistory } from "react-router";
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
    history.push("/store");
  };
  return (
    <Flex w="100vw" h="100vh" flexDirection="row">
      <Flex w="50%" h="100%" bg="red.600" alignItems="center">
        <Grid
          onSubmit={handleSubmit(handleSignIn)}
          as="form"
          w="70%"
          h="70%"
          bg="gray.10"
          ml="auto"
          mr="2%"
        >
          <input placeholder="email" type="email" {...register("email")} />
          <input
            placeholder="senha"
            type="password"
            {...register("password")}
          />
          <button type="submit">submit</button>
          <button onClick={() => history.push("/signup")}>cadastrar</button>
        </Grid>
      </Flex>
      <Flex w="50%" h="100%" bg="green.100" alignItems="center">
        <Grid w="70%" h="70%" bg="gray.1000" mr="auto" ml="2%"></Grid>
      </Flex>
    </Flex>
  );
};
