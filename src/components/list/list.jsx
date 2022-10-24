import React from 'react';
import styles from './list.module.css';

function List({children, scrollable}) {
  children = (Array.isArray(children)) ? children : [children];
  return (
    <ul className={styles.elements}>
      {children.map((child) => <li key={child.key}>{child}</li>)}
    </ul>
  )
}

export default List;
