import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIngredient} from '../burger-ingredient/burger-ingredient';
import styles from './burger-ingredients.module.css';
import List from '../list/list';
import PropTypes from 'prop-types';

function Category({name, items, state}) {
  return (
    <>
      <h2 className={`text text_type_main-medium`}>{name}</h2>
      <div className={`mt-6 mr-2 mb-10 ml-4`}>
        <List listExtraClass={`${styles.grid}`} itemExtraClass={styles.gridItem}>
          {items.map((item) => {
            const count = (item.type === 'bun'&& item._id === state.bun)
              ? 1
              : state.supplements.filter(x => x === item._id).length;

            return <BurgerIngredient key={item._id} {...item} count={count}/>;
          })}
        </List>
      </div>
    </>
  )
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      price: PropTypes.number,
      name: PropTypes.string,
      count: PropTypes.number
    })),
};

function BurgerIngredients({ingredients, state, types, defaultTab}) {

  const [currentTab, setCurrentTab] = useState(defaultTab);

  return (
    <section className={`${styles.inner}`}>
      <h1 className='mt-10 heading text text_type_main-large'>Соберите бургер</h1>

      <div className={`mt-5 ${styles.tabs}`}>
        {types.map(({key, name}) =>
          <Tab key={key} active={currentTab === key} value={key} onClick={setCurrentTab}>{name}</Tab>)}
      </div>

      <div className={`mt-10 ${styles.categories} scroll`}>
        <List>
          {types.map(({key, name}) =>
            <Category key={key} name={name} items={ingredients.filter(({type}) => type === key)} state={state}/>)}
        </List>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {};

export default BurgerIngredients;
