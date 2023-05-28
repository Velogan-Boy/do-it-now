import api from './axios';

const url = '/tasks';

// for getting all tasks

export const apiGetAllTasks = async () => {
   try {
      const { message, tasks } = await api.get(`${url}`);

      return { result: true, message, tasks };
   } catch (err) {
      return { result: false, message: err.response.data.message };
   }
};

// for getting a single task

export const apiGetTaskById = async (id) => {
   try {
      const { message, task } = await api.get(`${url}/${id}`);

      return { result: true, message, task };
   } catch (err) {
      return { result: false, message: err.response.data.message };
   }
};

// for creating a task

export const apiCreateTask = async (data) => {
   try {
      const { message, task } = await api.post(`${url}`, data);

      return { result: true, message, task };
   } catch (err) {
      return { result: false, message: err.response.data.message };
   }
};

// for updating a task

export const apiUpdateTask = async (id, data) => {
   try {
      const { message, task } = await api.put(`${url}/${id}`, data);

      return { result: true, message, task };
   } catch (err) {
      return { result: false, message: err.response.data.message };
   }
};

// mark a task as complete/incomplete

export const apiMarkTask = async (id) => {
   try {
      const { message, task } = await api.patch(`${url}/${id}/complete`,{});

      return { result: true, message, task };
   } catch (err) {
      return { result: false, message: err.response.data.message };
   }
};

// for deleting a task

export const apiDeleteTask = async (id) => {
   try {
      const { message } = await api.delete(`${url}/${id}`);

      return { result: true, message };
   } catch (err) {
      return { result: false, message: err.response.data.message };
   }
};
