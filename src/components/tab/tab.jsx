import React from 'react';
import styles from './tab.module.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
const getClassName = (isActive) => {
  return `${styles.link} text text_type_main-medium ${
    isActive ? 'text_color_primary' : 'text_color_inactive'
  }`;
};
function Tab({ title, ...rest }) {
  return (
    <div className={styles.tab}>
      <NavLink {...rest} className={getClassName}>
        {title}
      </NavLink>
    </div>
  );
}

Tab.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Tab;
