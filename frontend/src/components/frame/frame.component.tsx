import React from 'react';
import styles from './frame.module.css';

export const Frame: React.FC = ({children}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}