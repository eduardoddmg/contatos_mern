import * as Fetch from '../utils/api';

const loginObj = {
	admin: {
		success: "/admin",
		error: "/admin/login"
	}, 
	user: {
		success: "/",
		error: "/login"
	}
};

const registerObj = {
	admin: {
		success: "/admin/login",
		error: "/admin/register"
	}, 
	user: {
		success: "/login",
		error: "/register"
	}
};


export const reLogin = async (token) => {
	const response = await Fetch.get('/auth', token);

  	const username = response.username || "";
  	const role = response.role || "";

	const message = response.success
        ? "re-login feito com sucesso"
        : "sessão expirada";
  	const type = response.success ? "success" : "danger";
  	const route = response.success ? loginObj[role].success : loginObj[role].error;

  	console.log(role);

  	const success = response.success;

  	return { 
  		message, 
  		type, 
  		route, 
  		username, 
  		role, 
  		success 
  	};

}

export const login = async (data) => {
	const response = await Fetch.post('/auth/login', data);

	const role = response.role || "";
	const username = response.username || "";
	const token = response.token || "";

	const message = response.message;
	const type = response.success ? "success" : "danger";
	const route = response.success ? loginObj[role].success : loginObj[role].error;


	if (data.checkbox) localStorage.setItem("token", response.token);

	return { 
		message, 
		type, 
		route, 
		username, 
		token, 
		role 
	};
};

export const register = async (data) => {
	const response = await Fetch.post("/auth/register", data);

	const { type: role } = data; 

    const message = response.message;
    const type = response.success ? "success" : "danger";
	const route = response.success ? registerObj[role].success : registerObj[role].error;

	const success = response.success;

    return { message, type, route, success };
};