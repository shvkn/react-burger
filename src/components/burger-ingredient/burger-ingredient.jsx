import React from 'react';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import PropTypes from 'prop-types';
import Price from '../price/price';

export function BurgerIngredient({name, image, price, count= 0}) {
  return (
    <article className={styles.ingredient}>
      {(typeof count === 'number' && count > 0) && <Counter count={count} size='default'/>}
      <img className={`ml-4 mr-4 ${styles.image}`} src={image} alt={name}/>
      <span className={`mt-2`}>
        <Price value={price} />
      </span>
      <h3 className={`mt-1 text text_type_main-default`}>{name}</h3>
    </article>
  )
}

BurgerIngredient.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string.isRequired,
  count: PropTypes.number
}
