import { useDisclosure, Skeleton, Button, Table as TableChakra, TableContainer, Thead, Tr, Tbody, Td, Th } from "@chakra-ui/react";
import { useState } from 'react';

export const Table = ({ head, children, loading }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
	<TableContainer>
	  <TableChakra variant='simple'>
	    <Thead>
	      <Tr>
	      	{head.map((name, idx) => <Th>{name}</Th>)}
	      </Tr>
	    </Thead>
	    <Tbody>
	    {loading ? <Skeleton>
		    {children}
	    </Skeleton>: children}
	    </Tbody>
	  </TableChakra>
	</TableContainer>
	)
}