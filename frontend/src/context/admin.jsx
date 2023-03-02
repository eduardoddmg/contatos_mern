import { createContext, useState, useContext } from "react";
import * as Fetch from "../utils/api";
import { useAuth } from "./index";
import * as Functions from '../functions';

export const AdminContext = createContext({});

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [load, setLoad] = useState(true);

  const auth = useAuth();

  const getUsers = async () => {
    const response = await Functions.Admin.getUsers(auth.token);
    setUsers(response.users);
    setLoad(false);
  }

  return (
    <AdminContext.Provider
      value={{
        users,
        getUsers,
        load
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
