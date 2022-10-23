import React from 'react';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';

export function BurgerIngredient({image, price, name, count}) {
  return (
    <button className={styles.ingredient}>
      {(count > 0) && <Counter count={count} size='default'/>}
      <img className='ml-4 mr-4' src={image} alt={name}/>
      <p className={`${styles.price} text text_type_digits-default mt-1`}>
        {price}
        <span className='ml-2'>{<CurrencyIcon type='primary'/>}</span>
      </p>
      <h3 className={`text text_type_main-small mt-1`}>{name}</h3>
    </button>
  )
}
