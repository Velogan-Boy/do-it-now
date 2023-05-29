import api from './axios';

const url = '/users';

// for getting user info

export const apiGetUserInfo = async () => {
   try {
      let response = await api.get(`${url}`);

      const { message, user } = response.data;

      return { result: true, message, user };
   } catch (err) {
      if (err.response) throw err.response.data.message;
      throw err;
   }
};

// for registering user

export const apiRegisterUser = async (data) => {
   try {
      let response = await api.post(`${url}/register`, data);

      const { message, token } = response.data;

      return { result: true, message, token };
   } catch (err) {
      if (err.response) throw err.response.data.message;

      throw err;
   }
};

// for logging in user

export const apiLoginUser = async (data) => {
   try {
      let response = await api.post(`${url}/login`, data);

      const { message, token } = response.data;

      return { result: true, message, token };
   } catch (err) {
      
      console.log(err.response.data.message);
      
      if (err.response) throw err.response.data.message;

      throw err;
   }
};

// for logging out user

export const apiLogoutUser = async () => {
   try {
      let response = await api.get(`${url}/logout`);

      const { message } = response.data;

      return { result: true, message };
   } catch (err) {
      
      console.log(err);
      
      if (err.response) throw err.response.data.message;

      throw err;
   }
};
