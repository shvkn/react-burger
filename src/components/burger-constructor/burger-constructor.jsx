import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
  BURGER_ADD_INGREDIENT,
  BURGER_REMOVE_INGREDIENT,
  BURGER_RESET,
} from '../../services/actions/burger';
import { postOrder } from '../../utils/burger-api';
import { orderInitState, orderReducer } from '../../services/reducers/order-reducer';
import {
  ORDER_MAKE_FAILED,
  ORDER_MAKE_REQUEST,
  ORDER_MAKE_SUCCESS,
} from '../../services/actions/order';
import { useDispatch, useSelector } from 'react-redux';

function BurgerConstructor() {
  const ingredients = useSelector((store) => store.ingredientsList.items);
  // const { burger, dispatchBurger } = useContext(BurgerConstructorContext);
  const burger = useSelector((store) => store.burger);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [order, dispatchOrder] = useReducer(orderReducer, orderInitState);

  useEffect(() => {
    const fillConstructor = () => {
      dispatch({ type: BURGER_RESET });
      dispatch({
        type: BURGER_ADD_INGREDIENT,
        ingredient: ingredients.find(({ type }) => type === 'bun'),
      });
      ingredients
        .filter(({ type }) => type !== 'bun')
        .forEach((ingredient) => dispatch({ type: BURGER_ADD_INGREDIENT, ingredient }));
    };
    fillConstructor();
  }, [dispatch, ingredients]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleRemove = (index) => dispatch({ type: BURGER_REMOVE_INGREDIENT, index });

  const handleMakeOrder = () => {
    dispatchOrder({ type: ORDER_MAKE_REQUEST });
    handleOpenModal();
    const items = [burger.bun._id, ...burger.ingredients.map(({ _id }) => _id), burger.bun._id];
    postOrder(items)
      .then(({ success, order }) => {
        if (!success) throw new Error(`Error in "postOrder"`);
        dispatchOrder({ type: ORDER_MAKE_SUCCESS, number: order.number });
        dispatch({ type: BURGER_RESET });
      })
      .catch((error) => {
        console.error(error);
        dispatchOrder({ type: ORDER_MAKE_FAILED });
      });
  };

  const isOrderAllowed = () => burger.ingredients.length > 0;

  return (
    <div className={`${styles.burgerConstructor}`}>
      {showModal && (
        <Modal handleClose={handleCloseModal}>
          {order.isRequested && (
            <p className='mt-8 mb-30 text text_type_main-default'>Оформляем ваш заказ</p>
          )}
          {order.isFailed && (
            <p className='mt-8 mb-30 text text_type_main-default'>
              Произошла ошибка и мы не смогли принять ваш заказ. Пожалуйста, повторите позже.
            </p>
          )}
          {order.isSucceed && <OrderDetails number={order.number} />}
        </Modal>
      )}
      {!burger.bun && !burger.ingredients.length > 0 && (
        <div className={`ml-4 ${styles.container}`}>
          <div className={styles.message}>
            <p className={`mt-8 text text_type_main-medium text_color_inactive`}>
              Здесь пока пусто.
            </p>
            <p className={`mt-4 mb-30 text text_type_main-medium text_color_inactive`}>
              Перетащите нужные ингредиенты.
            </p>
          </div>
        </div>
      )}
      {(burger.bun || burger.ingredients.length > 0) && (
        <div className={`ml-4 ${styles.container}`}>
          <div className={`ml-8 ${styles.bun}`}>
            <ConstructorElement
              text={`${burger.bun.name} (верх)`}
              thumbnail={burger.bun.image}
              price={burger.bun.price}
              type='top'
              isLocked
            />
          </div>
          <ul className={`${styles.ingredients} mt-10 scroll`}>
            {burger.ingredients.map(({ image, name, price }, index) => {
              return (
                // TODO Временно отключено для использования `index` в `key`
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className={`mt-4 mb-4 ${styles.ingredient}`}>
                  <span className={styles.draggable}>
                    <DragIcon type='primary' />
                  </span>
                  <ConstructorElement
                    text={name}
                    thumbnail={image}
                    price={price}
                    handleClose={() => handleRemove(index)}
                  />
                </li>
              );
            })}
          </ul>
          <div className={`ml-8 ${styles.bun}`}>
            <ConstructorElement
              text={`${burger.bun.name} (низ)`}
              thumbnail={burger.bun.image}
              price={burger.bun.price}
              type='bottom'
              isLocked
            />
          </div>
        </div>
      )}
      <div className={`pt-10 pb-10 pr-4 ${styles.panel}`}>
        <div className={`mr-10 ${styles.price}`}>
          <p className='mr-2 text text_type_digits-medium'>{burger.totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          type='primary'
          size='large'
          htmlType='button'
          onClick={handleMakeOrder}
          disabled={!isOrderAllowed()}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
