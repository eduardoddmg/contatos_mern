import { VStack, Center, Button, Heading, Text } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../context";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputPassword, Input, Alert } from "../components/chakra";
import { configForm } from "../utils";

export const Login = () => {
  const [messageAlert, setMessageAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const auth = useAuth();
  const navigate = useNavigate();

  const loginForm = async (data) => {
    setLoading(true);
    const result = await auth.login(data);
    setLoading(false);
  };

  useEffect(() => {
    auth.resetMessage();
  }, []);

  return (
    <Center w="100%">
      <VStack
        onSubmit={handleSubmit(loginForm)}
        spacing={5}
        w={["95%", "40%"]}
        my="10vh"
        maxW="1500px"
        as="form"
        bg="#f4f4f4"
        p={[2, 10]}
      >
        <Heading>Login</Heading>
        {auth.messageError && <Alert success={false} />}
        {auth.messageSuccess && <Alert success />}
        <Input
          title="Username"
          errors={errors.username}
          {...register("username", configForm.username)}
        />
        <InputPassword
          title="Password"
          errors={errors}
          {...register("password", configForm.username)}
        />
        <Button isLoading={loading} type="submit" colorScheme="purple" w="100%">
          Entrar
        </Button>
        <Center>
          <Text>
            Ainda não tem uma conta?{" "}
            <Link to="/register" style={{ fontWeight: "bold" }}>
              Criar conta
            </Link>
          </Text>
        </Center>
      </VStack>
    </Center>
  );
};
