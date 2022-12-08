import {
  VStack,
  Center,
  FormControl,
  FormLabel,
  Button,
  Heading,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../context";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputPassword, Input, Alert } from "../components/chakra";
import { configForm } from "../utils";

export const Register = () => {
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

  const registerForm = async (data) => {
    setLoading(true);
    const result = await auth.register(data);
    if (result.success) navigate('/login');
    setLoading(false);
  };

  useEffect(() => {
    auth.resetMessage();
  }, []);

  return (
    <Center w="100%">
      <VStack
        onSubmit={handleSubmit(registerForm)}
        spacing={5}
        w={["95%", "40%"]}
        my="10vh"
        maxW="1500px"
        as="form"
        bg="#f4f4f4"
        p={[2, 10]}
      >
        <Heading>Register</Heading>
        {auth.message.txt && <Alert />}
        <Input
          title="Username"
          errors={errors.username}
          {...register("username", configForm.username)}
        />
        <InputPassword
          title="Password"
          errors={errors.password}
          {...register("password", configForm.password)}
        />
        <Button isLoading={loading} type="submit" colorScheme="purple" w="100%">
          Entrar
        </Button>
        <Center>
          <Text>
            Já tem uma conta?{" "}
            <Link to="/login" style={{ fontWeight: "bold" }}>
              Entrar na conta
            </Link>
          </Text>
        </Center>
      </VStack>
    </Center>
  );
};
