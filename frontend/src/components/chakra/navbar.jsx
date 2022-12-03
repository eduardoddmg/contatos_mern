import {
  Flex, Box
} from '@chakra-ui/react';

import { BiExit } from 'react-icons/bi';

import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <Box w="full">
      <Flex m="auto" maxW="1800px" justify="space-between" px="5%" py={5}>
        <Link to="/">Home</Link>
        <Link to="/logout" style={{fontSize: '22px', fontWeight: 'bold'}}><BiExit /></Link>
      </Flex>
    </Box>
  );
}
