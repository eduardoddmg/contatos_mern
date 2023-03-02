import * as Fetch from '../utils/api';

export const create = async (data, token) => {
    const response = await Fetch.post("/contact", data, token);

    const message = response.success
      ? "contato criado com sucesso"
      : "ERROR :(";
    const type = response.success ? "success" : "danger";
    const route = response.success ? "/" : "/form/contact";

    const success = response.success;

    return { message, type, route, success };
};

export const edit = async (data, id, token) => {
    const response = await Fetch.patch(`/contact/${id}`, data, token);

    const message = response.success
      ? "contato editado com sucesso"
      : "ERROR :(";
    const type = response.success ? "success" : "danger";
    const route = response.success ? "/" : "/form/contact";

    const success = response.success;

    return { message, type, route, success };
};

export const getAll = async (token) => {
	const response = await Fetch.get("/contact", token);

	response.contacts = response.count !== 0 ? response.contacts : null;

	const { contacts } = response;

	return { contacts };
};

export const remove = async (id, token) => {
	const response = await Fetch.remove(`/contact/${id}`, token);

    const message = response.success
      ? "contato apagado com sucesso"
      : "ERROR :(";
    const type = response.success ? "success" : "danger";
    const route = "/";

    return { message, type, route };
}