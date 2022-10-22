import React from 'react';
import styles from './nav-button.module.css';

function NavButton({icon, isActive, text}) {
  return (
    <button className={`${styles.button}`}>
      {icon}
      {text && <span className={`text text_type_main-default ml-2 ${isActive && styles.active}`}>
          {text}
        </span>}
    </button>
  )
}

export default NavButton;
