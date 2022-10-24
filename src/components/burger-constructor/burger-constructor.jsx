import React from 'react';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Price} from '../price/price';
import List from '../list/list';

function DraggableConstructorElement({_id, key, name, image, price}) {
  return (
    <>
      <DragIcon type={'primary'}/>
      <ConstructorElement key={key} text={name} thumbnail={image} price={price} extraClass={'ml-2'}/>
    </>
  )
}

function BurgerConstructor({state}) {

  const bunState = {
    text: `${state.bun.name} (верх)`,
    thumbnail: state.bun.image,
    price: state.bun.price,
    type: 'top',
    isLocked: true,
    extraClass: 'ml-8'
  }

  const supplements = state.supplements.map((x, index) => <DraggableConstructorElement {...x} key={index}/>)

  return (
    <div className={`${styles.burgerConstructor} ml-10 pt-25`}>

      <div className={`ml-4`}>

        <ConstructorElement {...bunState} />
        <List>{supplements}</List>
        <ConstructorElement {...bunState} text={`${state.bun.name} (низ)`} type='bottom' />

      </div>


      <div className={`${styles.panel} mt-10 pr-4`}>
        <Price size={'medium'}>999</Price>
        <Button type='primary' size='medium' extraClass='ml-10'>Оформить заказ</Button>
      </div>
    </div>)
}

export default BurgerConstructor;
