import React from 'react';
import styles from './price.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Price({value, size= 'default'}) {

  return (
    <p className={`${styles.price} text text_type_digits-${size}`}>
      {value}
      <span className={`ml-2`}>
        <CurrencyIcon type={'primary'}/>
      </span>
    </p>
  )
}

Price.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['default', 'medium', 'large'])
};

export default Price;
