import React from 'react';

import styles from './Button.module.css';

function Button({ children, onClickMethod }) {
   
   return (
      <button type="button" className={styles.button} onClick={onClickMethod}>
         <span className={styles.button__text}>{children}</span>
         <span className={styles.button__icon}>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               viewBox="0 0 24 24"
               strokeWidth={2}
               strokeLinecap="round"
               strokeLinejoin="round"
               stroke="currentColor"
               height="24"
               fill="none"
               className={styles.svg}
            >
               <line y2="19" y1="5" x2="12" x1="12"></line>
               <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg>
         </span>
      </button>
   );
}

export default Button;
