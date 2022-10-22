import React from 'react';
import styles from './nav-menu.module.css';
import PropTypes from 'prop-types';

function NavMenuItem({children, itemKey}) {
  return (
    <li className={styles.navMenuItem} key={itemKey}>
      {children}
    </li>
  );
}

function NavMenu({children, rightContent}) {

  return (
    <nav className={`${styles.navMenuContainer} ${rightContent && styles.right}`}>
      <ul className={`${styles.navMenuContainer}`}>
        {React.Children.toArray(children)
          .map((child, idx) => <NavMenuItem key={idx}>{child}</NavMenuItem>)}
      </ul>
    </nav>
  );
}

NavMenu.propTypes = {
  children: PropTypes.node.isRequired,
  rightContent: PropTypes.bool,
};

export default NavMenu;
