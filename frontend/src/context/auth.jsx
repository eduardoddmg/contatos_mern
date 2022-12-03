import { createContext, useState, useContext } from "react";
import { callServer } from "../actions";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');

  const register = async (data) => {
    const result =  await callServer(data, '/auth/register', 'post');
    if (result.success) {
      setMessageSuccess("conta criada com sucesso")
      setMessageError('');
    } else {
      setMessageSuccess("")
      setMessageError(result.message);
    }
    return result;
  };

  const login = async (data) => {
    const result = await callServer(data, '/auth/login', 'post', token);
    if (result.success) {
      setUsername(result.username);
      setToken(result.token);
      setMessageSuccess('')
      setIsLogged(true);
    } else setMessageError(result.message)
    return result;
  }

  const logout = () => {
    setUsername("");
    setToken("");
    setIsLogged(false);
    console.log('cheguei aqui');
    return true;
  }

  const resetMessage = () => setMessageError('');

  return (
    <AuthContext.Provider
      value={{
        username,
        isLogged,
        token,
        register,
        login,
        logout,
        messageError,
        messageSuccess,
        resetMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);