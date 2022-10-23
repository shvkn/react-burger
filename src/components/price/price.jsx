import React, {useState} from 'react';
import styles from './price.module.css';

import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export function Price({children, size}) {

  const sizeClass =
    (size === 'small')
      ? 'small'
      : (size === 'medium')
        ? 'medium'
        : (size === 'large')
          ? 'large'
          : 'default';

  return (
    <p className={`${styles.price} text text_type_digits-${sizeClass}`}>
      {children}
      <span className={`ml-2`}>
        <CurrencyIcon type={'primary'}/>
      </span>
    </p>
  )
}

export default Price;
