import { useContact, useAuth } from '../context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Loading = () => {
	const contact = useContact();
	const auth = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async() => {
			const result = await contact.getAll();
			console.log(result);
			if (result.success) navigate('/')
		}
		if (auth.isLogged) fetchData();
	}, []);

	return (
		<h1>Loading...</h1>
	)
}