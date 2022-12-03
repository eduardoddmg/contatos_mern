import { useState, forwardRef } from 'react';
import { InputGroup, Input, InputRightElement, Button, FormControl, FormLabel, FormErrorMessage} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const InputPassword = forwardRef((props, ref) => {
	const { title, errors, ...rest } = props;
	const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show);

	return (
		<FormControl isInvalid={errors.username}>
          <FormLabel>{title}</FormLabel>
		<InputGroup>
            <Input
              ref={ref}
              focusBorderColor="green.500"
              type={show ? 'text' : 'password'}
              {...props}
              // {...register("password", config.password)}
            />
            <InputRightElement width='4.5rem'>
            	<Button h='1.75rem' size='sm' onClick={handleClick}>
              	{show ? <ViewOffIcon /> : <ViewIcon />}
            	</Button>
          	</InputRightElement>
         </InputGroup>
         {errors.username && (
            <FormErrorMessage>{errors.username.message}</FormErrorMessage>
          )}
    	</FormControl>
	)
});