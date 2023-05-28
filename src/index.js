import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import theme from './theme';

import UserContextProvider from './context/UserContext';
import AppContextProvider from './context/AppContext';

import './index.css';
import TaskContextProvider from './context/TaskContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <Router>
         <AppContextProvider>
            <UserContextProvider>
               <TaskContextProvider>
                  <ThemeProvider theme={theme}>
                     <App />
                  </ThemeProvider>
               </TaskContextProvider>
            </UserContextProvider>
         </AppContextProvider>
      </Router>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

