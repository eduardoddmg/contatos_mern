import { createContext, useState, useContext } from "react";
import * as Fetch from "../utils/api";

import { useAuth } from "./index";

export const InfoContext = createContext({});

export const InfoProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const handleMessage = (type, data, route) =>
    setMessage({ type, data, route });
  const handleCloseMessage = () => setMessage(null);

  return (
    <InfoContext.Provider
      value={{
        message,
        handleMessage,
        handleCloseMessage,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => useContext(InfoContext);
