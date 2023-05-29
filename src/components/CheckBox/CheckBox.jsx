import React from 'react';

import styles from './CheckBox.module.css';

function CheckBox({ isCompleted, handleCheckBoxClick }) {
   return (
      <div className={styles.checkBox}>
         <div className={styles.cbx}>
            <input id="cbx" type="checkbox" checked={isCompleted} onChange={handleCheckBoxClick} />
            <label htmlFor="cbx"></label>
            <svg width="12" height="10" viewBox="0 0 15 14" fill="none">
               <path d="M2 8.36364L6.23077 12L13 2"></path>
            </svg>
         </div>

         <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
               <filter id="goo-12">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></feColorMatrix>
                  <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
               </filter>
            </defs>
         </svg>
      </div>
   );
}

export default CheckBox;
