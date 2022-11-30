import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Router from './Router';

import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <ContextProvider>
          <Router />
        </ContextProvider>
      </BrowserRouter>
  </React.StrictMode>
)
