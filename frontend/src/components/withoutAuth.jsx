import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { useEffect } from 'react';

export const WithoutAuth = () => {
	const { isLogged } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLogged) navigate('/');
	}, [isLogged]);


	return <Outlet />
}