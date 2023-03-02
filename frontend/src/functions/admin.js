import * as Fetch from '../utils/api';

export const getUsers = async (token) => {
	const response = await Fetch.get("/admin/users", token);
	return { users: response.users };
}