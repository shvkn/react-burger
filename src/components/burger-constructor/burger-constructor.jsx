import React, { useMemo, useState } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { makeOrder } from '../../services/actions/order';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import SortableElement from '../sortable-element/sortable-element';
import { IngredientTypes, ItemTypes } from '../../utils/constants';
import {
  selectIngredientById,
  selectIngredientsEntities,
} from '../../services/slices/ingredientsSlice';

import {
  actions as burgerActions,
  selectBurgerBun,
  selectBurgerIngredients,
  selectTotalPrice,
} from '../../services/slices/burgerSlice';

function BurgerConstructor() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const { order } = useSelector((store) => store);
  const ingredientsEntities = useSelector(selectIngredientsEntities);
  const burgerIngredients = useSelector(selectBurgerIngredients);
  const totalPrice = useSelector(selectTotalPrice);

  const burgerBunId = useSelector(selectBurgerBun);
  const burgerBun = useSelector((state) => selectIngredientById(state, burgerBunId));

  const hasBurgerBun = useMemo(() => !!burgerBunId, [burgerBunId]);
  const hasBurgerIngredients = useMemo(() => !!burgerIngredients.length, [burgerIngredients]);

  const burgerBunName = burgerBun?.name;
  const burgerBunPrice = burgerBun?.price;
  const burgerBunImage = burgerBun?.image;

  const handleOnDrop = (id) => {
    const { type } = ingredientsEntities[id];
    if (type === IngredientTypes.BUN) {
      dispatch(burgerActions.setBun(id));
    } else {
      dispatch(burgerActions.addIngredient(id));
    }
  };

  const [, dropTarget] = useDrop({
    accept: ItemTypes.BURGER_INGREDIENT,
    drop: ({ id }) => {
      handleOnDrop(id);
    },
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleRemove = (index) => dispatch(burgerActions.removeIngredient(index));

  const handleMakeOrder = () => {
    handleOpenModal();
    dispatch(makeOrder([burgerBunId, ...burgerIngredients, burgerBunId]));
  };

  const isOrderValid = useMemo(
    () => hasBurgerBun && hasBurgerIngredients,
    [hasBurgerBun, hasBurgerIngredients]
  );

  const handleMove = (hoverIndex, dragIndex) => {
    // console.log({ hoverIndex, dragIndex });
    dispatch(burgerActions.moveIngredient({ hoverIndex, dragIndex }));
  };

  return (
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
      <div className={`ml-4 ${styles.container}`}>
        {hasBurgerBun && (
          <div className={`ml-8 ${styles.bun}`}>
            <ConstructorElement
              text={`${burgerBunName} (верх)`}
              thumbnail={burgerBunImage}
              price={burgerBunPrice}
              type='top'
              isLocked
            />
          </div>
        )}
        {!isOrderValid && (
          <div className={styles.message}>
            <p className={`mt-8 text text_type_main-medium text_color_inactive`}>
              {!hasBurgerIngredients
                ? !hasBurgerBun
                  ? 'Пожалуйста, перетащите булку и ингредиенты'
                  : 'Добавьте ингредиенты'
                : 'Добавьте булку'}
            </p>
          </div>
        )}
        {hasBurgerIngredients && (
          <ul className={`${styles.ingredients} mt-10 scroll`}>
            {burgerIngredients.map(({ id, uid }, index) => {
              const { image, price, name } = ingredientsEntities[id];
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
        {hasBurgerBun && (
          <div className={`ml-8 ${styles.bun}`}>
            <ConstructorElement
              text={`${burgerBunName} (низ)`}
              thumbnail={burgerBunImage}
              price={burgerBunPrice}
              type='bottom'
              isLocked
            />
          </div>
        )}
      </div>
      <div className={`pt-10 pb-10 pr-4 ${styles.panel}`}>
        <div className={`mr-10 ${styles.price}`}>
          <p className='mr-2 text text_type_digits-medium'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          type='primary'
          size='large'
          htmlType='button'
          onClick={handleMakeOrder}
          disabled={!isOrderValid}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
