import {
  Alert as AlertChakra,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useAuth } from "../../context";

export const Alert = () => {
  const auth = useAuth();

  return auth.message.success ? (
    <AlertChakra status="success">
      <AlertIcon />
      {auth.message.txt}
    </AlertChakra>
  ) : (
    <AlertChakra status="error" align="center">
      <AlertIcon />
      <AlertTitle pb={0}>Algo aconteceu!</AlertTitle>
      <AlertDescription>{auth.message.txt}</AlertDescription>
    </AlertChakra>
  );
};
