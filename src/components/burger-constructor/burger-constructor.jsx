import React from 'react';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Price} from '../price/price';

function BurgerConstructor({state}) {
  return (
    <div className={`${styles.burgerConstructor} ml-10 pt-25`}>

      <div className={`${styles.elements} ml-4`}>
        <div className={`ml-8`}>
          <ConstructorElement text={`${state.bun.name} (верх)`} thumbnail={state.bun.image} price={state.bun.price} type={'top'} isLocked={true}/>
        </div>

        <ul className={`list pr-4 ${styles.elements} scroll`}>
          {state.supplements.map(({image, name, price, _id}, index) =>
            (<li className={`${styles.element}`} key={`${_id}_${index}`}>
                <span className={`${styles.drag} mr-2`}><DragIcon type={'primary'}/></span>
                <ConstructorElement text={name} thumbnail={image} price={price}/>
              </li>
            ))}
        </ul>

        <div className={`ml-8`}>
          <ConstructorElement text={`${state.bun.name} (низ)`} thumbnail={state.bun.image} price={state.bun.price} type={'bottom'} isLocked={true}/>
          </div>
      </div>

      <div className={`${styles.panel} mt-10 pr-4`}>
        <Price size={'medium'}>999</Price>
        <Button type='primary' size='medium' extraClass='ml-10'>
          Оформить заказ
        </Button>
      </div>
    </div>)
}

export default BurgerConstructor;
