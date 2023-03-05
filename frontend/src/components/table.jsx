import { Table as TableBootstrap } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export const Table = ({ data, columns, children }) => {
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

export const TableAuto = ({ data }) => {
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
	          	{data && data.map((item, index) => {
	                return (
	                  <tr key={index}>
	                    {columns && columns.map((column, i) => <td key={i}>{item[column]}</td>)}
	                  </tr>
	                )
	              })}
          	</tbody>
		</TableBootstrap>
	)
};