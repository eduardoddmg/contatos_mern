import { createContext, useState, useContext } from "react";
import { callServer } from "../actions";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [message, setMessage] = useState({txt: "", success: false});

  const register = async (data) => {
    const result = await callServer(data, "/auth/register", "post");
    if (result.success) {
      setMessage({txt: "conta criada com sucesso", success: true});
    } else {
      setMessageError({txt: result.message, success: false});
    }
    return result;
  };

  const login = async (data) => {
    const result = await callServer(data, "/auth/login", "post", token);
    if (result.success) {
      setUsername(result.username);
      setToken(result.token);
      setMessage("");
      setIsLogged(true);
    } else setMessage({txt: result.message, success: false});
    return result;
  };

  const logout = () => {
    setUsername("");
    setToken("");
    setIsLogged(false);
    console.log("cheguei aqui");
    return true;
  };

  const resetMessage = () => setMessage("");

  return (
    <AuthContext.Provider
      value={{
        username,
        isLogged,
        token,
        register,
        login,
        logout,
        message,
        resetMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
