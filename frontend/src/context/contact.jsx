import { createContext, useState, useEffect, useContext } from "react";
import { callServer } from "../actions";
import { useAuth } from "./auth";

export const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
  const auth = useAuth();

  const [data, setData] = useState([]);

  const register = async (data) => {
    const result = await callServer(data, "/contact", "post", auth.token);
    console.log(result);
    if (result.success) return getAll();
  };

  const getAll = async () => {
    const result = await callServer({}, "/contact", "get", auth.token);
    if (result.success) setData(result.contacts);
    return result;
  };

  const get = async () => {
    const result = await callServer({}, "/contact", "get", auth.token);
    if (result.success) setData(result.contacts);
    return result;
  };

  const edit = async (data, id) => {
    const result = await callServer(
      data,
      `/contact/${id}`,
      "patch",
      auth.token
    );
    if (result.success) return getAll();
  };

  const remove = async (id) => {
    console.log(id);
    const result = await callServer({}, `/contact/${id}`, "delete", auth.token);
    if (result.success) return getAll();
  };

  return (
    <ContactContext.Provider
      value={{
        data,
        register,
        getAll,
        remove,
        edit,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);
