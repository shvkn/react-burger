import React from 'react';
import styles from './nav-button.module.css';
import PropTypes from 'prop-types';

function NavButton({icon, text, extraClass, active = false}) {
  return (
    <button className={`pt-4 pl-5 pb-4 pr-5 ${styles.button} ${extraClass}`.trim()}>
      {icon}
      <span className={`ml-2 text text_type_main-default ${active ? 'text_color_primary' : 'text_color_inactive'}`}>
        {text}
      </span>
    </button>
  );
}

NavButton.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  active: PropTypes.bool,
};

export default NavButton;
