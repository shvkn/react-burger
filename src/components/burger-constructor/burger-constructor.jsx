import React from 'react';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import List from '../list/list';

function DraggableConstructorElement({name, image, price}) {
  return (
    <>
      <DragIcon type={'primary'}/>
      <ConstructorElement text={name} thumbnail={image} price={price} extraClass={'ml-2'}/>
    </>
  )
}

function BurgerConstructor({ingredients, state}) {

  const supplements =
    <List itemExtraClass={'mt-4'}>
      {state.supplements.map((id, index) => {
        return <DraggableConstructorElement key={index} {...ingredients.find(i => i._id === id)} />;
      })}
    </List>

  const bun = ingredients.find(i => i._id === state.bun)
  const topBun = <ConstructorElement
    text={`${bun.name} (верх)`}
    thumbnail={bun.image}
    price={bun.price}
    type='top'
    isLocked={true}
  />

  const bottomBun = <ConstructorElement
    text={`${bun.name} (низ)`}
    thumbnail={bun.image}
    price={bun.price}
    type='bottom'
    isLocked={true}
  />

  return (
    <div className={`${styles.burgerConstructor}`}>

      <div className={`ml-4 ${styles.components}`}>
        <div className={`ml-8 ${styles.edge}`}>
          {topBun}
        </div>
        <div className={`pr-2 scroll`}>
          {supplements}
        </div>
        <div className={`mt-4 ml-8 ${styles.edge}`}>
          {bottomBun}
        </div>
      </div>

      <div className={`mt-10 pr-4 ${styles.panel}`}>
        <Price value={state.total} size='medium' />
        <Button type='primary' size='large' extraClass='ml-10' htmlType='button'>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default BurgerConstructor;
