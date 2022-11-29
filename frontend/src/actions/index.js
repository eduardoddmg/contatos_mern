import axios from 'axios';

const handleError = err => err.response.data;

const instance = axios.create({
	baseURL: 'http://localhost:3001/api/auth',
	// headers: {' X-ACCESS-TOKEN': 'BuM9B%$!b$%'}
});

export const callServer = async (data, path, type) => {
	switch (type) {
	    case 'get':
	      return await getServer(path);
	    case 'post':
	      return await postServer(path, data);
	    case 'patch':
	      return await patchServer(path, data);
	    case 'patch':
	      return await deleteServer(path, data);
	}	
};

const getServer = async (path) => {
	try {
		const response = await instance.get(path);
		const result = response.data;
		return result;
	} catch(err) {
		return handleError(err);
	}
};

const postServer = async (path, data) => {
	try {
		const response = await instance.post(path, data);
		const result = response.data;
		return result;
	} catch(err) {
		return handleError(err);
	}
};

const patchServer = async (path, data) => {
	try {
		const response = await instance.patch(path, data);
		const result = response.data;
		return result;
	} catch(err) {
		return handleError(err);
	}
};

const deleteServer = async (path, data) => {
	try {
		const response = await instance.delete(path, data);
		const result = response.data;
		return result;
	} catch(err) {
		return handleError(err);
	}
};
