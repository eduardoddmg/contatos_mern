import axios from 'axios';

const handleError = err => err.response.data;


export const callServer = async (data, path, type, token) => {
	const instance = axios.create({
		baseURL: 'http://localhost:3001/api',
		headers: {'authorization': token}
	});

	switch (type) {
	    case 'get':
	      return await getServer(path, instance);
	    case 'post':
	      return await postServer(path, data, instance);
	    case 'patch':
	      return await patchServer(path, data, instance);
	    case 'delete':
	      return await deleteServer(path, instance);
	}	
};

const getServer = async (path, instance) => {
	try {
		const response = await instance.get(path);
		console.log(response);
		const result = response.data;
		return result;
	} catch(err) {
		return handleError(err);
	}
};

const postServer = async (path, data, instance) => {
	try {
		const response = await instance.post(path, data);
		const result = response.data;
		return result;
	} catch(err) {
		return handleError(err);
	}
};

const patchServer = async (path, data, instance) => {
	try {
		const response = await instance.patch(path, data);
		const result = response.data;
		return result;
	} catch(err) {
		return handleError(err);
	}
};

const deleteServer = async (path, instance) => {
	try {
		const response = await instance.delete(path);
		const result = response.data;
		return result;
	} catch(err) {
		return handleError(err);
	}
};
