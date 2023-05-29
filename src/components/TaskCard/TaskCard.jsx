import React, { useContext, useState } from 'react';
import moment from 'moment/moment';

import useAudio from '../../hooks/useAudio';

import CheckBox from '../CheckBox/CheckBox';

import { TaskContext } from '../../context/TaskContext';

import styles from './TaskCard.module.css';
import { Tooltip } from 'antd';

function TaskCard({ task, onClick }) {
   const { handleMarkTask } = useContext(TaskContext);

   const [playing, toggle] = useAudio(`${window.location.origin}/sounds/yes.mp3`);

   const [isCompleted, setIsCompleted] = useState(task.isCompleted);

   const handleCheckBoxClick = () => {
      if (!isCompleted) toggle();

      setIsCompleted(!isCompleted);

      handleMarkTask(task.id).then((result) => {
         if (!result) {
            setIsCompleted(!isCompleted);
         }
      });
   };

   return (
      <Tooltip title={task.description} placement="bottom" color='geekblue'>
      <div className={styles.task} key={task.id}>
         <div className={styles.task__status}>
            <CheckBox handleCheckBoxClick={handleCheckBoxClick} isCompleted={isCompleted} />
         </div>

         <h3 onClick={onClick} className={`${styles.task__title} ${isCompleted ? styles.task__title__completed : ''}`}>
            {task.title}
         </h3>

         <div className={styles.task__deadline}>{task.deadline && <div className="task-deadline">{new moment(task.deadline).format('MMM DD ')}</div>}</div>
      </div>
      </Tooltip>
   );
}

export default TaskCard;
