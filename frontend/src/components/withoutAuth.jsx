import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { useEffect, useState } from 'react';
import { Layout } from './layout';
import { LoadingComponent } from './loading'

export const WithoutAuth = () => {
	const [loading, setLoading] = useState(true);
	const { isLogged } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLogged) navigate('/loading');
	}, [isLogged]);

	useEffect(() => {
		setLoading(false);
	}, [])

	return loading ? <LoadingComponent /> : <Outlet />
}