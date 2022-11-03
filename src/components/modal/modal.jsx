import React, { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { modalRoot } from '../../utils/constants';
import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

CloseIcon.propTypes = { type: PropTypes.string };

function Modal({ children, handleClose, header = '' }) {
  const handleCloseByEsc = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleCloseByEsc);
    return () => document.removeEventListener('keydown', handleCloseByEsc);
  }, []);

  const modal = (
    <ModalOverlay handleClick={handleClose}>
      <div className={`pt-10 pr-10 pb-15 pl-10 ${styles.modal}`}>
        <span className={`${styles.panel}`}>
          <p className={'text text_type_main-large'}>{header}</p>
          <span className={styles.close}>
            <CloseIcon type='primary' onClick={handleClose} />
          </span>
        </span>
        {children}
      </div>
    </ModalOverlay>
  );
  return ReactDOM.createPortal(modal, modalRoot);
}
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
};
export default Modal;
