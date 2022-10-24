import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIngredient} from '../burger-ingredient/burger-ingredient';
import styles from './burger-ingredients.module.css';
import List from '../list/list';

function renderCategory({name, items}) {
  return (
    <>
      <h2 className={`text text_type_main-medium`}>{name}</h2>
      <div className={'mt-6 mb-10 ml-4 mr-2'}>
        <List listExtraClass={`${styles.grid}`} itemExtraClass={styles.gridItem}>
          {items.map((item) => <BurgerIngredient key={item._id} {...item} count={2}/>)}
        </List>
      </div>
    </>
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

      <div className={`${styles.categories} mt-10 scroll`}>
        <List itemExtraClass={''}>
          {types.map(({key, name}) =>
            renderCategory({name, items: ingredients.filter(({type}) => type === key)}))}
        </List>
        {/*        <ol className='list'>
          {types.map(({key, name}) =>
            <li className='listItem' key={key}>
              {renderCategory({name, items: ingredients.filter(({type}) => type === key)})}
            </li>)}
        </ol>*/}
      </div>
    </section>
  )
}

export default BurgerIngredients;
