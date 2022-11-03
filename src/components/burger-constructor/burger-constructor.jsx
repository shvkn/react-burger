import React, { useState } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ingredientPropTypes, orderStatePropTypes } from '../../utils/prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

function BurgerConstructor({ ingredients, order }) {
  const [showModal, setShowModal] = useState(false);

  const bun = ingredients.find(({ _id }) => _id === order.bun);
  const filteredIngredients = ingredients.filter(({ _id }) => order.ingredients.includes(_id));
  const total = filteredIngredients.reduce((sum, { price }) => sum + price, 0) + bun.price * 2;

  const modal = (
    <Modal handleClose={() => setShowModal(false)}>
      <OrderDetails />
    </Modal>
  );

  return (
    <div className={`${styles.burgerConstructor}`}>
      {showModal && modal}
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
          {filteredIngredients.map(({ image, name, price }, index) => {
            return (
              // TODO Временно отключено для использования `index` в `key`
              // eslint-disable-next-line react/no-array-index-key
              <li key={index} className={`mt-4 mb-4 ${styles.ingredient}`}>
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
          <p className='mr-2 text text_type_digits-medium'>{total}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='large' htmlType='button' onClick={() => setShowModal(true)}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  order: orderStatePropTypes.isRequired,
};

export default BurgerConstructor;
