import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";

import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context";
import { ChakraProvider } from "@chakra-ui/react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import dotenv from 'dotenv';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <ContextProvider>
          <Router />
        </ContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
