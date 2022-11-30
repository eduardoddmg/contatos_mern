import { useAuth } from '../context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		console.log('cheguei aqui')
		auth.logout();
	}, []);

	return (
		<h1>Logout</h1>
	)
}