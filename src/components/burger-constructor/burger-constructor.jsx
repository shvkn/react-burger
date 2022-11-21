import React, { useEffect, useState } from 'react';
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
  addBurgerIngredient,
  moveBurgerIngredient,
  removeBurgerIngredientByIndex,
} from '../../services/actions/burger';
import { makeOrder } from '../../services/actions/order';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SortableElement from '../sortable-element/sortable-element';

function BurgerConstructor() {
  const { burger, order } = useSelector((store) => store);
  const { ingredientsItems } = useSelector((store) => store.ingredients);

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const addAnyBun = () => {
      const bun = ingredientsItems.find(({ type }) => type === 'bun');
      dispatch(addBurgerIngredient(bun));
    };
    if (!burger.bun) {
      addAnyBun();
    }
  }, [ingredientsItems]);

  const handleOnDrop = (item) => {
    const ingredient = ingredientsItems.find(({ _id }) => _id === item.id);
    dispatch(addBurgerIngredient(ingredient));
  };

  const [, dropTarget] = useDrop({
    accept: 'burger-ingredient',
    drop: (item) => {
      handleOnDrop(item);
    },
  });
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleRemove = (index) => dispatch(removeBurgerIngredientByIndex(index));

  const handleMakeOrder = () => {
    handleOpenModal();
    dispatch(makeOrder([burger.bun, ...burger.ingredients, burger.bun]));
  };

  const isOrderValid = () => burger.bun && burger.ingredients.length > 0;

  const handleMove = (hoverIndex, dragIndex) => {
    dispatch(moveBurgerIngredient(hoverIndex, dragIndex));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`${styles.burgerConstructor}`} ref={dropTarget}>
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
        {burger.bun && (
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
            {burger.ingredients.length === 0 && (
              <div className={styles.message}>
                <p className={`mt-8 text text_type_main-medium text_color_inactive`}>
                  Добавьте ингредиенты
                </p>
              </div>
            )}
            {!!burger.ingredients.length && (
              <ul className={`${styles.ingredients} mt-10 scroll`}>
                {burger.ingredients.map(({ image, name, price, uid }, index) => {
                  return (
                    <li key={uid} className={`mt-4 mb-4`}>
                      <SortableElement index={index} handleMove={handleMove}>
                        <div className={styles.ingredient}>
                          <DragIcon type='primary' />
                          <ConstructorElement
                            text={name}
                            thumbnail={image}
                            price={price}
                            handleClose={() => handleRemove(index)}
                          />
                        </div>
                      </SortableElement>
                    </li>
                  );
                })}
              </ul>
            )}
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
            disabled={!isOrderValid()}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </DndProvider>
  );
}

export default BurgerConstructor;
