import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentIngredient, setCurrentIngredient } from '../../services/actions/ingredients';

function BurgerIngredients() {
  const dispatch = useDispatch();
  const { ingredientsItems, currentIngredient } = useSelector((store) => store.ingredients);
  const burger = useSelector((store) => store.burger);
  const [currentTab, setCurrentTab] = useState('');

  const ingredientsRootRef = useRef();
  const ingredinentsRefsByType = {
    buns: useRef(),
    sauces: useRef(),
    mains: useRef(),
  };

  const observeCurrentTab = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrentTab(entry.target.id);
        });
      },
      { root: ingredientsRootRef.current, rootMargin: '-50% 0px' }
    );
    for (const type in ingredinentsRefsByType)
      observer.observe(ingredinentsRefsByType[type].current);
  }, [ingredientsRootRef, ingredinentsRefsByType]);

  useEffect(() => {
    observeCurrentTab();
  }, [observeCurrentTab]);

  const ingredientsByType = useMemo(
    () => ({
      bun: ingredientsItems.filter(({ type }) => type === 'bun'),
      sauce: ingredientsItems.filter(({ type }) => type === 'sauce'),
      main: ingredientsItems.filter(({ type }) => type === 'main'),
    }),
    [ingredientsItems]
  );

  const selectedItems = useMemo(() => {
    const items = burger.bun ? { [burger.bun._id]: 2 } : {};
    burger.ingredients.forEach(({ _id }) => {
      items[_id] = items[_id] + 1 || 1;
    });
    return items;
  }, [burger]);

  const handleTabClick = (value) => {
    setCurrentTab(value);
    ingredinentsRefsByType[value].current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenModal = (ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
  };

  const handleCloseModal = () => {
    dispatch(resetCurrentIngredient());
  };

  return (
    <section className={styles.burgerIngredients}>
      {currentIngredient && (
        <Modal handleClose={handleCloseModal} title='Детали ингредиента'>
          <IngredientDetails ingredient={currentIngredient} />
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
      <ul className={`${styles.categories} scroll`} ref={ingredientsRootRef}>
        <li key='buns' id='buns' ref={ingredinentsRefsByType['buns']}>
          <h2 className='text text_type_main-medium'>Булки</h2>
          <div className='mt-6 mr-2 mb-10 ml-4'>
            <ul className={`${styles.ingredients}`}>
              {ingredientsByType.bun.map((item) => (
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

        <li key='sauces' id='sauces' ref={ingredinentsRefsByType['sauces']}>
          <h2 className='text text_type_main-medium'>Соусы</h2>
          <div className='mt-6 mr-2 mb-10 ml-4'>
            <ul className={`${styles.ingredients}`}>
              {ingredientsByType.sauce.map((item) => (
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

        <li key='mains' id='mains' ref={ingredinentsRefsByType['mains']}>
          <h2 className='text text_type_main-medium'>Начинки</h2>
          <div className='mt-6 mr-2 mb-10 ml-4'>
            <ul className={`${styles.ingredients}`}>
              {ingredientsByType.main.map((item) => (
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
