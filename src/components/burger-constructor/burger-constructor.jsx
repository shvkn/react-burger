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
import { makeOrder } from '../../services/slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import SortableElement from '../sortable-element/sortable-element';
import { IngredientTypes, ItemTypes } from '../../utils/constants';

import { actions as burgerActions } from '../../services/slices/burgerSlice';
import {
  selectBurgerBun,
  selectBurgerIngredients,
  selectIngredientById,
  selectIngredientsEntities,
  selectIsBurgerBunEmpty,
  selectIsBurgerIngredientsEmpty,
  selectOrderNumber,
  selectOrderSlice,
  selectTotalPrice,
} from '../../utils/selectors';

function BurgerConstructor() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const order = useSelector(selectOrderSlice);
  const orderNumber = useSelector(selectOrderNumber);
  const ingredientsEntities = useSelector(selectIngredientsEntities);
  const burgerIngredients = useSelector(selectBurgerIngredients);
  const totalPrice = useSelector(selectTotalPrice);

  const burgerBunId = useSelector(selectBurgerBun);
  const burgerBun = useSelector(selectIngredientById(burgerBunId));

  const isBunEmpty = useSelector(selectIsBurgerBunEmpty);
  const isIngredientsEmpty = useSelector(selectIsBurgerIngredientsEmpty);

  const isOrderValid = useMemo(
    () => !isBunEmpty && !isIngredientsEmpty,
    [isBunEmpty, isIngredientsEmpty]
  );

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
    const burgerIngredientsIds = burgerIngredients.map(({ id }) => id);
    handleOpenModal();
    dispatch(makeOrder([burgerBunId, ...burgerIngredientsIds]));
  };

  const handleMove = (hoverIndex, dragIndex) => {
    dispatch(burgerActions.moveIngredient({ hoverIndex, dragIndex }));
  };

  return (
    <div className={`${styles.burgerConstructor}`} ref={dropTarget}>
      {showModal && (
        <Modal handleClose={handleCloseModal}>
          {order.isLoading && (
            <p className='mt-8 mb-30 text text_type_main-default'>?????????????????? ?????? ??????????</p>
          )}
          {order.error && (
            <p className='mt-8 mb-30 text text_type_main-default'>
              ?????????????????? ???????????? ?? ???? ???? ???????????? ?????????????? ?????? ??????????. ????????????????????, ?????????????????? ??????????.
            </p>
          )}
          {!order.isLoading && !order.error && <OrderDetails number={orderNumber} />}
        </Modal>
      )}
      <div className={`ml-4 ${styles.container}`}>
        {!isBunEmpty && (
          <div className={`ml-8 ${styles.bun}`}>
            <ConstructorElement
              text={`${burgerBunName} (????????)`}
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
              {isIngredientsEmpty
                ? isBunEmpty
                  ? '????????????????????, ???????????????????? ?????????? ?? ??????????????????????'
                  : '???????????????? ??????????????????????'
                : '???????????????? ??????????'}
            </p>
          </div>
        )}
        {!isIngredientsEmpty && (
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
        {!isBunEmpty && (
          <div className={`ml-8 ${styles.bun}`}>
            <ConstructorElement
              text={`${burgerBunName} (??????)`}
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
          ???????????????? ??????????
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
