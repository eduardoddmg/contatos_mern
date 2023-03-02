import { Table as TableBootstrap } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export const Table = ({ data, children }) => {
	const [columns, setColumns] = useState(null);

	useEffect(() => {
		setColumns(Object.keys(data[0]));
	}, []);

	if (data) return (
		<TableBootstrap striped bordered hover className="w-75" responsive>
			<thead>
	            <tr>
	              {columns && columns.map((item, index) => <th key={index}>{item}</th>)}
	            </tr>
          	</thead>
          	<tbody>
          		{ children }
          		
          	</tbody>
		</TableBootstrap>
	)
};