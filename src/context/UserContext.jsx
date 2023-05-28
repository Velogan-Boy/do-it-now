import React, { createContext, useEffect, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { apiGetUserInfo, apiRegisterUser, apiLoginUser, apiLogoutUser } from '../api/users';

export const UserContext = createContext();

const { AppContext } = require('./AppContext');

const UserContextProvider = (props) => {
   const { loader, setLoader, isLoggedin, setIsLoggedin } = useContext(AppContext);

   const navigate = useNavigate();

   const [user, setUser] = useState({});

   // Register User Handler
   
   const handleRegister = async ({ name, email, password, confirmPassword }) => {
      setLoader(true);

      // Check if all fields are filled

      if (!name || !email || !password || !confirmPassword) {
         toast.error('Please fill all the fields');
         setLoader(false);
         return;
      }

      // Check if password is at least 8 characters long

      if (password.length < 8) {
         toast.error('Password must be at least 8 characters long');
         setLoader(false);
         return;
      }

      // Check if passwords match

      if (password !== confirmPassword) {
         toast.error('Passwords do not match');
         setLoader(false);
         return;
      }

      // Register User

      const { result, message, token } = await apiRegisterUser({ name, email, password });

      if (!result) {
         toast.error(message);
         setLoader(false);
         return;
      }

      // set the local storage with the token

      localStorage.setItem('token', token);

      // loggin the user in

      setIsLoggedin(true);

      // Navigate to home page

      navigate('/');

      // Loader false
      setLoader(false);
   };
   
   // Login User Handler

   const handleLogin = async ({ email, password }) => {
      setLoader(true);

      // Check if all fields are filled

      if (!email || !password) {
         toast.error('Please fill all the fields');
         setLoader(false);
         return;
      }

      // Login User

      const { result, message, token } = await apiLoginUser({ email, password });

      if (!result) {
         toast.error(message);
         setLoader(false);
         return;
      }

      // set the local storage with the token

      localStorage.setItem('token', token);

      // logging the user in

      setIsLoggedin(true);

      // Navigate to home page

      navigate('/');

      // Loader false

      setLoader(false);
   };
   
   // Logout User Handler

   const handleLogout = async () => {
      setLoader(true);

      // Logout User

      const { result, message } = await apiLogoutUser();

      if (!result) {
         toast.error(message);
         setLoader(false);
         return;
      }

      // Remove the token from local storage

      localStorage.removeItem('token');

      // logging the user out

      setIsLoggedin(false);

      // Navigate to home page

      navigate('/');

      // Loader false

      setLoader(false);
   };

   useEffect(() => {
      // Check if user is logged in ( if there is a token in local storage )

      apiGetUserInfo()
         .then((res) => {
            setUser(res.data.user);
            setIsLoggedin(true);
         })
         .catch((err) => {
            setIsLoggedin(false);
         });
   }, []);

   return <UserContext.Provider value={{ user, setUser, handleRegister, handleLogin, handleLogout }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
