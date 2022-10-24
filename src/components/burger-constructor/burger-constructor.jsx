import React from 'react';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Price} from '../price/price';
import List from '../list/list';

function DraggableConstructorElement({_id, key, name, image, price}) {
  return (
    <>
      <DragIcon type={'primary'}/>
      <ConstructorElement key={key}
                          text={name}
                          thumbnail={image}
                          price={price}
                          extraClass={'ml-2'}/>
    </>
  )
}

function BurgerConstructor({state}) {

  const supplements =
    <List itemExtraClass={'mt-4'}>
      {state.supplements.map((x, index) => <DraggableConstructorElement {...x} key={index}/>)}
    </List>

  const topBun = <ConstructorElement
    text={`${state.bun.name} (верх)`}
    thumbnail={state.bun.image}
    price={state.bun.price}
    type='top'
    isLocked={true}
  />

  const bottomBun = <ConstructorElement
    text={`${state.bun.name} (низ)`}
    thumbnail={state.bun.image}
    price={state.bun.price}
    type='bottom'
    isLocked={true}
  />

  return (
    <div className={`${styles.burgerConstructor} ml-10 pt-25`}>

      <div className={`${styles.components} ml-4`}>
        <div className={`${styles.edge} ml-8`}>
          {topBun}
        </div>
        <div className={`scroll pr-2`}>
          {supplements}
        </div>
        <div className={`${styles.edge} ml-8 mt-4`}>
          {bottomBun}
        </div>
      </div>

      <div className={`${styles.panel} mt-10 pr-4`}>
        <Price size='medium'>999</Price>
        <Button type='primary' size='large' extraClass='ml-10'>Оформить заказ</Button>
      </div>
    </div>
  )
}

export default BurgerConstructor;
