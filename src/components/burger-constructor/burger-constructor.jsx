import React from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ingredientPropTypes, burgerStatePropTypes } from '../../utils/prop-types';

function BurgerConstructor({ ingredients, state }) {
  const bun = ingredients.find(({ _id }) => _id === state.bun);
  return (
    <div className={`${styles.burgerConstructor}`}>
      <div className={`ml-4 ${styles.container}`}>
        <div className={`ml-8 ${styles.bun}`}>
          <ConstructorElement
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            price={bun.price}
            type='top'
            isLocked
          />
        </div>
        <ul className={`${styles.ingredients} mt-10 scroll`}>
          {state.ingredients.map((_id, index, arr) => {
            const { image, name, price } = ingredients.find(({ _id: id }) => id === _id);
            const key = `${_id}/${arr.filter((i) => i === _id).length}`;
            return (
              <li key={key} className={`mt-4 mb-4 ${styles.ingredient}`}>
                <span className={styles.draggable}>
                  <DragIcon type='primary' />
                </span>
                <ConstructorElement text={name} thumbnail={image} price={price} />
              </li>
            );
          })}
        </ul>
        <div className={`ml-8 ${styles.bun}`}>
          <ConstructorElement
            text={`${bun.name} (низ)`}
            thumbnail={bun.image}
            price={bun.price}
            type='bottom'
            isLocked
          />
        </div>
      </div>
      <div className={`pt-10 pb-10 pr-4 ${styles.panel}`}>
        <div className={`mr-10 ${styles.price}`}>
          <p className='mr-2 text text_type_digits-medium'>{state.total}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='large' htmlType='button'>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  state: burgerStatePropTypes.isRequired,
};

export default BurgerConstructor;
