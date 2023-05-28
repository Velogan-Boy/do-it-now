import api from './axios';

const url = '/users';


// for getting user info

export const apiGetUserInfo = async () => {
   try {
      const { message, user } = await api.get(`${url}`);

      return { result: true, message, user };
   } catch (err) {
      return { result: false, message: err.response.data.message };
   }
};

// for registering user

export const apiRegisterUser = async (data) => {
   try {
      const { message, token } = await api.post(`${url}/register`, data);

      return { result: true, message, token };
   } catch (err) {
      return { result: false, message: err.response.data.message };
   }
};

// for logging in user

export const apiLoginUser = async (data) => {
   try {
      const { message, token } = await api.post(`${url}/login`, data);

      return { result: true, message, token };
   } catch (err) {
      return { result: false, message: err.response.data.message };
   }
};

// for logging out user

export const apiLogoutUser = async () => {
   try {
      const { message } = await api.post(`${url}/logout`);

      return { result: true, message };
   } catch (err) {
      return { result: false, message: err.response.data.message };
   }
};
