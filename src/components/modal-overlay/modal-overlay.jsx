import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ handleClick }) {
  const handleClose = (e) => {
    if (e.currentTarget === e.target) handleClick();
  };

  return <div className={`${styles.overlay}`} onClick={handleClose} />;
}

ModalOverlay.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
