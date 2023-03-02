import { createContext, useState, useContext, useEffect } from "react";
import { useInfo } from "./index";

import * as Functions from '../functions';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(true);

  const info = useInfo();

  useEffect(() => {
    const getData = async () => {
      const { type, message, route, ...response } = await Functions.Auth.reLogin(token);

      setUsername(response.username);
      setRole(response.role);

      info.handleMessage(type, message, route);

      if (!response.success) logout();

      setLoading(false);
    };

    if (token) getData();
    else setLoading(false);
  }, []);

  const register = async (data) => {
    const { success, type, message, route } = await Functions.Auth.register(data);

    info.handleMessage(type, message, route);

    return success;
  };

  const login = async (data) => {
    const response = await Functions.Auth.login(data);

    const { type, message, route } = response;

    setUsername(response.username);
    setToken(response.token);
    setRole(response.role);

    info.handleMessage(type, message, route);
  };

  const logout = () => {
    setUsername("");
    setToken("");
    localStorage.setItem("token", "");
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        register,
        login,
        logout,
        role,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
