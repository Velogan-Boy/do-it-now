import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import moment from 'moment/moment';
import { Input, Modal, Form, DatePicker, Radio, Pagination, Tooltip, Button as AntButton } from 'antd';
import { FiLogOut } from 'react-icons/fi';

import TaskCard from '../../components/TaskCard/TaskCard';
import Button from '../../components/Button/Button';

import { TaskContext } from '../../context/TaskContext';
import { AppContext } from '../../context/AppContext';
import { UserContext } from '../../context/UserContext';

import styles from './Home.module.css';
import CreateTaskModal from '../../components/CreateTaskModal/CreateTaskModal';
import UpdateTaskModal from '../../components/UpdateTaskModal/UpdateTaskModal';

function Home() {
   const { handleCreateTask, handleMarkTest, handleUpdateTask, handleDeleteTask, tasks, setIsCompleted, page, setPage } = useContext(TaskContext);
   const { handleLogout } = useContext(UserContext);
   const { loader, isLoggedin } = useContext(AppContext);

   const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
   const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);
   const [updateKey, setUpdateKey] = useState(null);

   const navigate = useNavigate();

   const handleFilter = (e) => {
      if (e.target.value === 0) {
         setIsCompleted(null);
      }

      if (e.target.value === 1) {
         setIsCompleted(false);
      }

      if (e.target.value === 2) {
         setIsCompleted(true);
      }

      setPage(1);
   };

   const [form] = Form.useForm();

   useEffect(() => {
      if (isLoggedin === false) {
         navigate('/login');
      }
   }, [isLoggedin]);

   return (
      <div className={styles.home}>
         {/* Notification alert toast container */}

         <Toaster />

         {/* Header */}

         <div className={styles.home__header}>
            <h1>
               <a href="/"> Do-It-Now! </a>
            </h1>
            <Button
               onClickMethod={() => {
                  setisCreateModalOpen(true);
               }}
            >
               Add Task
            </Button>
         </div>

         {/* Body */}

         {/* Tabs for filtering */}

         <Radio.Group defaultValue={0} buttonStyle="solid" onChange={handleFilter}>
            <Radio.Button value={0}>All</Radio.Button>
            <Radio.Button value={1}>Pending</Radio.Button>
            <Radio.Button value={2}>Completed</Radio.Button>
         </Radio.Group>

         <div className={styles.home__body}>
            {tasks.length === 0 && (
               <div className={styles.home__body__empty}>
                  <h2> No Tasks Found! </h2>
               </div>
            )}

            {tasks.map((task) => (
               <TaskCard
                  key={task.id}
                  task={task}
                  mark={handleMarkTest}
                  onClick={() => {
                     setisUpdateModalOpen(true);

                     form.setFieldsValue({
                        title: task.title,
                        description: task.description,
                        deadline: moment(task.deadline),
                     });
                     setUpdateKey(task.id);
                  }}
               />
            ))}
         </div>

         {/* Footer */}

         <div className={styles.home__footer}>
            {/* Pagination */}
            <Pagination
               onChange={(page) => {
                  setPage(page);
               }}
               defaultCurrent={1}
               current={page}
               total={50}
               defaultPageSize={7}
               responsive={true}
            />
         </div>

         <Tooltip title="Logout" placement="left" color="geekblue">
            <AntButton type="primary" icon={<FiLogOut />} className={styles.logoutBtn} onClick={handleLogout} loading={loader} />
         </Tooltip>

         <CreateTaskModal isModalOpen={isCreateModalOpen} setisModalOpen={setisCreateModalOpen} form={form} handleCreateTask={handleCreateTask} />
         <UpdateTaskModal
            isModalOpen={isUpdateModalOpen}
            setIsModalOpen={setisUpdateModalOpen}
            form={form}
            handleUpdateTask={handleUpdateTask}
            handleDeleteTask={handleDeleteTask}
            taskId={updateKey}
         />
      </div>
   );
}

export default Home;
