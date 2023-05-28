import React, { createContext, useEffect, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';

import { apiGetAllTasks, apiCreateTask, apiUpdateTask, apiMarkTask, apiDeleteTask } from '../api/tasks';

export const TaskContext = createContext();

const { AppContext } = require('./AppContext');

const TaskContextProvider = (props) => {
   const { loader, setLoader, isLoggedin, setIsLoggedin } = useContext(AppContext);

   const [tasks, setTasks] = useState([]);

   // Get All Tasks Handler

   const handleGetAllTasks = async () => {
      setLoader(true);

      const { result, message, tasks } = await apiGetAllTasks();

      if (!result) {
         toast.error(message);
         setLoader(false);
         return;
      }

      setTasks(tasks);
      setLoader(false);
   };

   // Create Task Handler

   const handleCreateTask = async ({ title, description, deadline }) => {
      setLoader(true);

      if (!title) {
         toast.error('Please fill the title');
         setLoader(false);
         return;
      }

      const { result, message } = await apiCreateTask({ title, description, deadline });

      if (!result) {
         toast.error(message);
         setLoader(false);
         return;
      }

      await handleGetAllTasks();

      setLoader(false);

      toast.success(message);
   };

   // Update Task Handler

   const handleUpdateTask = async ({ id, title, description, deadline }) => {
      setLoader(true);

      if (!title) {
         toast.error('Please fill the title');
         setLoader(false);
         return;
      }

      const { result, message } = await apiUpdateTask(id, { title, description, deadline });

      if (!result) {
         toast.error(message);
         setLoader(false);
         return;
      }

      await handleGetAllTasks();

      setLoader(false);

      toast.success(message);
   };

   // Mark Task Complete/Incomplete Handler

   const handleMarkTask = async ({ id, isCompleted }) => {
      setLoader(true);

      const { result, message } = await apiMarkTask(id);

      if (!result) {
         toast.error(message);
         setLoader(false);
         return;
      }

      await handleGetAllTasks();

      setLoader(false);

      toast.success(message);
   };

   // Delete Task Handler

   const handleDeleteTask = async ({ id }) => {
      setLoader(true);

      const { result, message } = await apiDeleteTask(id);

      if (!result) {
         toast.error(message);
         setLoader(false);
         return;
      }

      await handleGetAllTasks();

      setLoader(false);

      toast.success(message);
   };

   useEffect(() => {
      if (isLoggedin) {
         handleGetAllTasks();
      }
   }, [isLoggedin]);

   return (
      <TaskContext.Provider
         value={{
            tasks,
            handleGetAllTasks,
            handleCreateTask,
            handleUpdateTask,
            handleMarkTask,
            handleDeleteTask,
         }}
      >
         {props.children}
      </TaskContext.Provider>
   );
};

export default TaskContextProvider;
