import React, { useContext, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import { BurgerConstructorContext } from '../../services/context/burger-constructor-context';
import { useSelector } from 'react-redux';

function BurgerIngredients() {
  const ingredients = useSelector((store) => store.ingredientsList.items);
  const [currentTab, setCurrentTab] = useState('buns');
  const [ingredient, setIngredient] = useState(null);
  const refs = {
    buns: useRef(),
    sauces: useRef(),
    mains: useRef(),
  };

  const handleTabClick = (value) => {
    setCurrentTab(value);
    refs[value].current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenModal = (ingredient) => {
    setIngredient(ingredient);
  };

  const handleCloseModal = () => {
    setIngredient(null);
  };

  const buns = useMemo(() => ingredients.filter((i) => i.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((i) => i.type === 'sauce'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((i) => i.type === 'main'), [ingredients]);

  const { burger } = useContext(BurgerConstructorContext);

  const selectedItems = useMemo(() => {
    const items = burger.bun ? { [burger.bun._id]: 2 } : {};
    burger.ingredients.forEach(({ _id }) => {
      items[_id] = items[_id] + 1 || 1;
    });
    return items;
  }, [burger]);

  return (
    <section className={styles.burgerIngredients}>
      {ingredient && (
        <Modal handleClose={handleCloseModal} title='Детали ингредиента'>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
      <h1 className='mt-10 mb-5 heading text text_type_main-large'>Соберите бургер</h1>
      <div className='mb-10'>
        <ul className={`${styles.tabs}`}>
          <li key={'buns'}>
            <Tab active={currentTab === 'buns'} value={'buns'} onClick={handleTabClick}>
              Булки
            </Tab>
          </li>

          <li key={'sauces'}>
            <Tab active={currentTab === 'sauces'} value={'sauces'} onClick={handleTabClick}>
              Соусы
            </Tab>
          </li>

          <li key={'mains'}>
            <Tab active={currentTab === 'mains'} value={'mains'} onClick={handleTabClick}>
              Начинки
            </Tab>
          </li>
        </ul>
      </div>
      <ul className={`${styles.categories} scroll`}>
        <li key='buns' ref={refs['buns']}>
          <h2 className='text text_type_main-medium'>Булки</h2>
          <div className='mt-6 mr-2 mb-10 ml-4'>
            <ul className={`${styles.ingredients}`}>
              {buns.map((item) => (
                <li key={item._id}>
                  <BurgerIngredient
                    ingredient={item}
                    handleClick={() => handleOpenModal(item)}
                    count={selectedItems[item._id] ?? 0}
                  />
                </li>
              ))}
            </ul>
          </div>
        </li>

        <li key='sauces' ref={refs['sauces']}>
          <h2 className='text text_type_main-medium'>Соусы</h2>
          <div className='mt-6 mr-2 mb-10 ml-4'>
            <ul className={`${styles.ingredients}`}>
              {sauces.map((item) => (
                <li key={item._id}>
                  <BurgerIngredient
                    ingredient={item}
                    handleClick={() => handleOpenModal(item)}
                    count={selectedItems[item._id] ?? 0}
                  />
                </li>
              ))}
            </ul>
          </div>
        </li>

        <li key='mains' ref={refs['mains']}>
          <h2 className='text text_type_main-medium'>Начинки</h2>
          <div className='mt-6 mr-2 mb-10 ml-4'>
            <ul className={`${styles.ingredients}`}>
              {mains.map((item) => (
                <li key={item._id}>
                  <BurgerIngredient
                    ingredient={item}
                    handleClick={() => handleOpenModal(item)}
                    count={selectedItems[item._id] ?? 0}
                  />
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;
