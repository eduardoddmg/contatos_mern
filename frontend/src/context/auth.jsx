import { createContext, useState, useContext } from "react";
import { callServer } from "../actions";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const register = async (data) => await callServer(data, '/auth/register', 'post');

  const login = async (data) => {
    const result = await callServer(data, '/auth/login', 'post', token);
    if (result.success) {
      setUsername(result.username);
      setToken(result.token);
      setIsLogged(true);
    }
    return result;
  }

  const logout = () => {
    setUsername("");
    setToken("");
    setIsLogged(false);
  }

  return (
    <AuthContext.Provider
      value={{
        username,
        isLogged,
        token,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);