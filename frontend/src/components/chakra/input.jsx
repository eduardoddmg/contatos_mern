import { useState, forwardRef } from 'react';
import { InputGroup, Input as InputChakra, InputRightElement, Button,  FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

export const Input = forwardRef((props, ref) => {
	const { title, errors, type, ...rest } = props;

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show);

	return (
		<FormControl isInvalid={errors}>
          <FormLabel>{title}</FormLabel>
          <InputChakra
            focusBorderColor="green.500"
            type={type}
            ref={ref}
            {...rest}
          />
          {errors && (
            <FormErrorMessage>{errors.message}</FormErrorMessage>
          )}
    </FormControl>
	)
});