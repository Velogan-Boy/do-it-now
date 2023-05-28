import axios from 'axios';

const api = axios.create({
   baseURL: 'https://do-it-now-api.onrender.com/api/v1',
   headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
   },
});

export default api;
