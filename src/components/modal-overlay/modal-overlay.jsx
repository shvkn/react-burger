import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ children, handleClick }) {
  const handleClose = (e) => {
    if (e.currentTarget === e.target) handleClick();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
