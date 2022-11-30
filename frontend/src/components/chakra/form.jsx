import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

import { Link as LinkNavigation } from 'react-router-dom'

const obj = {
  login: {
    title: 'Login',
    text: 'Sign in to your account',
    link: '/register',
    textBottom: 'Não tem uma conta?'
  }, register: {
    title: 'Register',
    text: 'Sign up to your account',
    link: '/login',
    textBottom: 'Já tem uma conta?'
  }
}

export const Form = ({ login }) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>{login ? obj.login.text : obj.register.text}</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Username</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              {/*<Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>*/}
              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                {login ? obj.login.title : obj.register.title}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                {login ? obj.login.textBottom : obj.register.textBottom} <Link as={LinkNavigation} to={login ? obj.login.link : obj.register.link} color={'blue.400'}>{login ? obj.login.title : obj.register.title}</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
