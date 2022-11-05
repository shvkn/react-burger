import styles from '../burger-ingredient/burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { ingredientPropTypes } from '../../utils/prop-types';
import PropTypes from 'prop-types';

export function BurgerIngredient({ ingredient, handleClick, count }) {
  return (
    // TODO Временно отключено из-за якорной ссылки
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a className={styles.ingredient} onClick={handleClick}>
      {count > 0 && <Counter count={count} size='default' />}
      <img
        className={`ml-4 mr-4 mb-2 ${styles.ingredientImage}`}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <div className={`${styles.ingredientPrice}`}>
        <p className='mr-2 text text_type_digits-default'>{ingredient.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <h3 className='mt-2 text text_type_main-default'>{ingredient.name}</h3>
    </a>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  count: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
