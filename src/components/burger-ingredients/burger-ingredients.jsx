import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIngredient} from '../burger-ingredient/burger-ingredient';
import styles from './burger-ingredients.module.css';

function renderCategory({name, items}) {
  return (
    <section>
      <h2 className={`text text_type_main-medium`}>{name}</h2>
      <ul className={`${styles.grid} mt-6 pr-4 pl-4 mb-10`}>
        {items.map((item) =>
          <li className={styles.gridItem} key={item._id}>
            <BurgerIngredient {...item} count={2}/>
          </li>)}
      </ul>
    </section>
  )
}

function BurgerIngredients({ingredients, types, defaultTab}) {

  const [currentTab, setCurrentTab] = useState(defaultTab);

  return (
    <section className={`${styles.innerContainer}`}>
      <h1 className='heading text text_type_main-large mt-10'>Соберите бургер</h1>

      <div className={`${styles.tabs} mt-5`}>
        {types.map(({key, name}) =>
          <Tab key={key} active={currentTab === key} value={key} onClick={setCurrentTab}>{name}</Tab>)}
      </div>

      <div className='scroll mt-10'>
        <ol className='list'>
          {types.map(({key, name}) =>
            <li className='listItem' key={key}>
              {renderCategory({name, items: ingredients.filter(({type}) => type === key)})}
            </li>)}
        </ol>
      </div>
    </section>
  )
}

export default BurgerIngredients;
