import React, { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const MODAL_ROOT = document.getElementById('react-modals');

function Modal({ children, handleClose, title = '' }) {
  useEffect(() => {
    const handleCloseByEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleCloseByEsc);
    return () => document.removeEventListener('keydown', handleCloseByEsc);
  }, [handleClose]);

  const modal = (
    <>
      <div className={`${styles.modal}`}>
        <div className={`ml-10 mt-10 mr-10 ${styles.panel}`}>
          <p className={`text text_type_main-large`}>{title}</p>
          <button className={styles.close}>
            <CloseIcon type='primary' onClick={handleClose} />
          </button>
        </div>
        <div className={`${styles.content}`}>{children}</div>
      </div>
      <ModalOverlay handleClick={handleClose} />
    </>
  );

  return ReactDOM.createPortal(modal, MODAL_ROOT);
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
