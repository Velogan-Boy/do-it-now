import React, { createContext, useEffect, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';

import { apiGetAllTasks, apiCreateTask, apiUpdateTask, apiMarkTask, apiDeleteTask } from '../api/tasks';

export const TaskContext = createContext();

const { AppContext } = require('./AppContext');

const TaskContextProvider = (props) => {
   const { loader, setLoader, isLoggedin, setIsLoggedin } = useContext(AppContext);

   const [isCompleted, setIsCompleted] = useState(null);
   const [tasks, setTasks] = useState([]);
   const [page, setPage] = useState(1);

   // Get All Tasks Handler

   const handleGetAllTasks = async (showToast) => {
      // Show the toast with message

      if (showToast) {
         toast.promise(apiGetAllTasks(page, isCompleted), {
            loading: 'Loading Tasks...',
            success: (data) => {
               let sortedTasks = data.tasks;

               if (isCompleted !== true) {
                  // sort the data.tasks by task.deadline

                  sortedTasks = data.tasks.sort((a, b) => {
                     if (a.deadline === null) return 1;
                     if (b.deadline === null) return -1;
                     return new Date(a.deadline) - new Date(b.deadline);
                  });
               }

               // sort the data.tasks by task.isCompleted

               sortedTasks = sortedTasks.sort((a, b) => {
                  return a.isCompleted - b.isCompleted;
               });

               setTasks(sortedTasks);
               return 'Tasks Loaded Successfully!';
            },
            error: (err) => {
               return err;
            },
         });

         // Don't show the toast - Just set the data
      } else {
         apiGetAllTasks(page, isCompleted)
            .then((data) => {
               // sort the data.tasks by task.deadline

               let sortedTasks = data.tasks.sort((a, b) => {
                  if (a.deadline === null) return 1;
                  if (b.deadline === null) return -1;

                  return new Date(a.deadline) - new Date(b.deadline);
               });

               // sort the data.tasks by task.isCompleted

               sortedTasks = sortedTasks.sort((a, b) => {
                  return a.isCompleted - b.isCompleted;
               });

               setTasks(sortedTasks);
            })
            .catch((err) => {
               toast.error(err);
            });
      }
   };

   // Create Task Handler

   const handleCreateTask = async ({ title, description, deadline }) => {
      // Validations

      if (!title) {
         toast.error('Please fill the title');
         setLoader(false);
         return;
      }

      // Show the toast with message

      toast.promise(apiCreateTask({ title, description, deadline }), {
         loading: 'Creating Task...',
         success: (data) => {
            handleGetAllTasks();
            return data.message;
         },
         error: (err) => {
            return err;
         },
      });
   };

   // Update Task Handler

   const handleUpdateTask = async ({ id, title, description, deadline }) => {
      setLoader(true);

      if (!title) {
         toast.error('Please fill the title');
         setLoader(false);
         return;
      }

      toast.promise(apiUpdateTask(id, { title, description, deadline }), {
         loading: 'Updating Task...',
         success: (data) => {
            handleGetAllTasks();
            return data.message;
         },

         error: (err) => {
            return err;
         },
      });

      setLoader(false);
   };

   // Mark Task Complete/Incomplete Handler

   const handleMarkTask = async (id) => {
      apiMarkTask(id)
         .then((data) => {
            handleGetAllTasks();
         })
         .catch((err) => {
            toast.error(err);
         });
   };

   // Delete Task Handler

   const handleDeleteTask = async (id) => {
      setLoader(true);

      toast.promise(apiDeleteTask(id), {
         loading: 'Deleting Task...',
         success: (data) => {
            handleGetAllTasks();
            setLoader(false);
            return data.message;
         },

         error: (err) => {
            setLoader(false);
            return err;
         },
      });
   };

   useEffect(() => {
      if (isLoggedin === false) return;
      handleGetAllTasks(true);
   }, [page, isCompleted, isLoggedin]);

   return (
      <TaskContext.Provider
         value={{
            tasks,
            handleGetAllTasks,
            handleCreateTask,
            handleUpdateTask,
            handleMarkTask,
            handleDeleteTask,
            isCompleted,
            setIsCompleted,
            page,
            setPage,
         }}
      >
         {props.children}
      </TaskContext.Provider>
   );
};

export default TaskContextProvider;
