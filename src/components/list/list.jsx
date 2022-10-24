import React from 'react';
import styles from './list.module.css';

function prepareClassName(className) {
  return (typeof className === 'string' && className.trim() !== '') ? className.trim() : ''
}

function List({children, listExtraClass, itemExtraClass}) {
  children = (Array.isArray(children)) ? children : [children];
  listExtraClass = prepareClassName(listExtraClass);
  itemExtraClass = prepareClassName(itemExtraClass);

  return (
    <ul className={`${styles.list} ${listExtraClass}`}>
      {children.map((child) => <li key={child.key} className={`${styles.listItem} ${itemExtraClass}`}>{child}</li>)}
    </ul>
  )
}

export default List;
