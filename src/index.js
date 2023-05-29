import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import reportWebVitals from './reportWebVitals';

import App from './App';

import UserContextProvider from './context/UserContext';
import AppContextProvider from './context/AppContext';
import TaskContextProvider from './context/TaskContext';

import '@fontsource/poppins/700.css';
import '@fontsource-variable/inter';

import theme from './theme';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <React.StrictMode>
      <ConfigProvider theme={theme}>
      <Router>
         <AppContextProvider>
            <UserContextProvider>
               <TaskContextProvider>
                  <App />
               </TaskContextProvider>
            </UserContextProvider>
         </AppContextProvider>
      </Router>
      </ConfigProvider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

