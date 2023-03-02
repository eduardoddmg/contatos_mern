import { createContext, useState, useContext, useEffect } from "react";
import * as Functions from "../functions";

import { useAuth, useInfo } from "./index";

export const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [bodyEdit, setBodyEdit] = useState(null);
  const [load, setLoad] = useState(false);

  const auth = useAuth();

  const info = useInfo();

  useEffect(() => {
    if (!auth.token) setData(null);
  }, [auth.token]);

  const create = async (data) => {
    const response = await Functions.Contact.create(data, auth.token);
    const { type, message, route, success } = response;

    getAll();

    info.handleMessage(type, message, route);

    return success;
  };

  const edit = async (data, id) => {
    const response = await Functions.Contact.edit(data, id, auth.token);
    const { type, message, route, success } = response;

    getAll();

    info.handleMessage(type, message, route);

    return success;
  };

  const getAll = async () => {
    const response = await Functions.Contact.getAll(auth.token);

    console.log(response);

    setData(response.contacts);
    setLoad(true);
  };

  const remove = async (id) => {
    const { type, message, route } = await Functions.Contact.remove(id, auth.token);

    getAll();

    info.handleMessage(type, message, route);
  };

  const handleBodyEdit = (data) => setBodyEdit(data);

  return (
    <ContactContext.Provider
      value={{
        data,
        create,
        remove,
        getAll,
        handleBodyEdit,
        bodyEdit,
        edit,
        load,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);
