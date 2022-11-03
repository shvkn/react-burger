import React from 'react';
import styles from './order-details.module.css';
import doneImage from '../../images/done.svg';

function OrderDetails() {
  return (
    <div className={`mt-4 mb-30 ${styles.inner}`}>
      <p className={`text text_type_digits-large ${styles.id}`}>034536</p>
      <p className={`mt-8 text text_type_main-medium`}>Идентификатор заказа</p>
      <img className={`mt-15`} src={doneImage} alt='Заказ оформлен' />
      <p className={`mt-15 text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`mt-2 text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
