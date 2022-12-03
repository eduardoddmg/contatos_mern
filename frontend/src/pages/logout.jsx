import { useAuth } from "../context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";

export const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("cheguei aqui");
    auth.logout();
  }, []);

  return (
    <Center mt="10vh">
      <Spinner size="xl" />
    </Center>
  );
};
