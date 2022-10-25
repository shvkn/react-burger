import React from 'react';
import styles from './nav-menu.module.css';
import PropTypes from 'prop-types';
import List from '../list/list';

function NavMenu({children, rightContent}) {

  return (
    <nav className={`${(rightContent === true)? styles.right : ''}`}>
      <List listExtraClass={styles.items}>
        {children}
      </List>
    </nav>
  );
}

NavMenu.propTypes = {
  children: PropTypes.node.isRequired,
  rightContent: PropTypes.bool,
};

export default NavMenu;
