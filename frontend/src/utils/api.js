import axios from 'axios';

const DEVELOPMENT = true;

const BASE_URL = DEVELOPMENT ? "http://localhost:3001/api" : 'https://contatos-mern.onrender.com/api';

export const api = axios.create({
	baseURL: BASE_URL
});

export const get = async (url, token) => {
	try {
		const response = await api.get(url, { 
        	headers: {
          		'authorization': token
        	}});
		response.data.type = 'success';
		return response.data;
	} catch (error) {
		console.log(error);

		error.response.data.type = 'danger';
		return error.response.data;
	}
};

export const post = async (url, data, token=null) => {
	try {
		const response = await api.post(url, data, { 
        	headers: {
          		'authorization': token
        	}});
		response.data.type = 'success';
		return response.data;
	} catch (error) {
		error.response.data.type = 'danger';
		return error.response.data;
	}
};

export const patch = async (url, data, token=null) => {
	try {
		const response = await api.patch(url, data, { 
        	headers: {
          		'authorization': token
        	}});
		response.data.type = 'success';
		return response.data;
	} catch (error) {
		error.response.data.type = 'danger';
		return error.response.data;
	}
};

export const remove = async (url, token) => {
	try {
		const response = await api.delete(url, { 
        	headers: {
          		'authorization': token
        	}});
		response.data.type = 'success';
		return response.data;
	} catch (error) {
		error.response.data.type = 'danger';
		return error.response.data;
	}
};