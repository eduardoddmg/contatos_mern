import * as Fetch from '../utils/api';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const Wait = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const response = await Fetch.get("/");
			console.log(response);
			setLoading(false);
		}

		fetchData()
	}, []);

	return loading ? (
		<section className="text-center">
			<h1 className="fs-1 pt-5 py-3">Está carregando</h1>
			<p>Tenha paciência, a API é lenta por conta do servidor gratuito</p>
		</section>
	) : <Outlet />
};