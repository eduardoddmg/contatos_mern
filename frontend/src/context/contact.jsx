import { createContext, useState, useContext } from "react";
import { callServer } from "../actions";
import { useAuth } from './auth';

export const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
  const auth = useAuth();

  const [data, setData] = useState(null);

  const register = async (data) => {
    const result = await callServer(data, '/contact', 'post', auth.token);
    console.log(result);
    if (result.success) return getAll();
  };

  const getAll = async () => {
    const result = await callServer({}, '/contact', 'get', auth.token);
    if (result.success) setData(result.contacts);
    return result;
  };

  const get = async () => {
    const result = await callServer({}, '/contact', 'get', auth.token);
    if (result.success) setData(result.contacts);
    return result;
  };

  const edit = async () => {
    const result = await callServer({}, '/contact', 'get', auth.token);
    if (result.success) setData(result.contacts);
    return result;
  };

  const remove = async () => {
    const result = await callServer({}, '/contact', 'get', auth.token);
    if (result.success) setData(result.contacts);
    return result;
  };

  return (
    <ContactContext.Provider
      value={{
        data,
        register,
        getAll
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => useContext(ContactContext);