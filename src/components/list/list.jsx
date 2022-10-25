import React from 'react';
import styles from './list.module.css';
import PropTypes from 'prop-types';


function List({children, listExtraClass, itemExtraClass}) {
  children = (Array.isArray(children)) ? children : [children];

  return (
    <ul className={`${styles.list} ${listExtraClass}`.trim()}>
      {children.map((child, i) => <li key={(child.key) ? child.key : i} className={`${styles.item} ${itemExtraClass}`.trim()}>{child}</li>)}
    </ul>
  )
}

List.propTypes = {
  children: PropTypes.any,
  listExtraClass: PropTypes.string,
  itemExtraClass: PropTypes.string,
};

export default List;
