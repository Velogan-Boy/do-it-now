import api from './axios';

const url = '/tasks';

// for getting all tasks

export const apiGetAllTasks = async (page, isCompleted) => {
   try {
      let isCompletedQuery = isCompleted == null ? '' : `&isCompleted=${isCompleted ? 1 : 0}`;

      let response = await api.get(`${url}?page=${page}&limit=7${isCompletedQuery}`);

      const { message, tasks } = response.data;

      return { message, tasks, result: true };
   } catch (err) {
      if (err.response) throw err.response.data.message;
      throw err;
   }
};

// for getting a single task

export const apiGetTaskById = async (id) => {
   try {
      let response = await api.get(`${url}/${id}`);

      const { message, task } = response.data;

      return { message, task, result: true };
   } catch (err) {
      if (err.response) throw err.response.data.message;
      throw err;
   }
};

// for creating a task

export const apiCreateTask = async (data) => {
   try {
      let response = await api.post(`${url}`, data);

      const { message, task } = response.data;

      return { message, task };
   } catch (err) {
      if (err.response) throw err.response.data.message;

      throw err;
   }
};

// for updating a task

export const apiUpdateTask = async (id, data) => {
   try {
      let requestBody = {
         title: data.title ? data.title : undefined,
         description: data.description ? data.description : undefined,
         deadline: data.deadline ? data.deadline : undefined,
      };

      let response = await api.put(`${url}/${id}`, requestBody);

      const { message, task } = response.data;

      return { message, task };
   } catch (err) {
      console.log(err);

      if (err.response) throw err.response.data.message;

      throw err;
   }
};

// mark a task as complete/incomplete

export const apiMarkTask = async (id) => {
   try {
      let response = await api.patch(`${url}/${id}/complete`);

      const { message, task } = response.data;

      return { message, task };
   } catch (err) {
      if (err.response) throw err.response.data.message;

      throw err;
   }
};

// for deleting a task

export const apiDeleteTask = async (id) => {
   try {
      let response = await api.delete(`${url}/${id}`);

      const { message } = response.data;

      return { message };
   } catch (err) {
      if (err.response) throw err.response.data.message;

      throw err;
   }
};
