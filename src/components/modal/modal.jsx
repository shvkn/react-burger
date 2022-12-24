import React, { useCallback, useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';

const MODAL_ROOT = document.getElementById('react-modals');

function Modal({ children, title = '' }) {
  const history = useHistory();

  const back = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleClose = () => {
    back();
  };

  useEffect(() => {
    const handleCloseByEsc = (e) => {
      if (e.key === 'Escape') back();
    };
    document.addEventListener('keydown', handleCloseByEsc);
    return () => document.removeEventListener('keydown', handleCloseByEsc);
  }, [back]);

  return ReactDOM.createPortal(
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
      <ModalOverlay onClick={handleClose} />
    </>,
    MODAL_ROOT
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Modal;
