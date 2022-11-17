import React, { useContext, useMemo, useState } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { IngredientsContext } from '../../services/context/ingredients-context';

function BurgerConstructor() {
  const ingredients = useContext(IngredientsContext);
  const burger = useMemo(
    () => ({
      bun: '60d3b41abdacab0026a733c7',
      ingredients: [
        '60d3b41abdacab0026a733ca',
        '60d3b41abdacab0026a733cc',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4',
        '60d3b41abdacab0026a733d0',
      ],
    }),
    []
  );
  const [showModal, setShowModal] = useState(false);

  const bun = useMemo(
    () => ingredients.find(({ _id }) => _id === burger.bun),
    [ingredients, burger.bun]
  );

  const filteredIngredients = useMemo(
    () => ingredients.filter(({ _id }) => burger.ingredients.includes(_id)),
    [ingredients, burger.ingredients]
  );

  const total = useMemo(
    () => filteredIngredients.reduce((sum, { price }) => sum + price, 0) + bun.price * 2,
    [filteredIngredients, bun.price]
  );

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className={`${styles.burgerConstructor}`}>
      {showModal && (
        <Modal handleClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
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
        <Button type='primary' size='large' htmlType='button' onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
