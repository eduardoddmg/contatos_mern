import { Alert as AlertChakra, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useAuth } from '../../context';

export const Alert = ({ success }) => {
	const auth = useAuth();

	return (success) ? 
          <AlertChakra status='success'>
            <AlertIcon />
            {auth.messageSuccess}
          </AlertChakra> :
          <AlertChakra status="error" align="center">
            <AlertIcon />
            <AlertTitle pb={0}>Algo aconteceu!</AlertTitle>
            <AlertDescription>{auth.messageError}</AlertDescription>
          </AlertChakra>
}