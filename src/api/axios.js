import axios from 'axios';

const api = axios.create({
   baseURL: 'https://do-it-now-api.onrender.com/api/v1',
   // baseURL: 'http://localhost:5000/api/v1',
   headers: {
      'Content-Type': 'application/json',
   },
});

// to add the token to the header of the request

api.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token');

      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
   },

   (error) => {
      return Promise.reject(error);
   }
);

export default api;
