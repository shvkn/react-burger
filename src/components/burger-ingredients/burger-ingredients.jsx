import React, { useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentIngredient, setCurrentIngredient } from '../../services/actions/ingredients';

function BurgerIngredients() {
  const { ingredientsItems, currentIngredient } = useSelector((store) => store.ingredients);
  const burger = useSelector((store) => store.burger);

  const [currentTab, setCurrentTab] = useState('buns');

  const refs = {
    buns: useRef(),
    sauces: useRef(),
    mains: useRef(),
  };

  const dispatch = useDispatch();

  const handleTabClick = (value) => {
    setCurrentTab(value);
    refs[value].current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenModal = (ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
  };

  const handleCloseModal = () => {
    dispatch(resetCurrentIngredient());
  };

  const ingredientsTypeBun = useMemo(
    () => ingredientsItems.filter((i) => i.type === 'bun'),
    [ingredientsItems]
  );
  const ingredientsTypeSauce = useMemo(
    () => ingredientsItems.filter((i) => i.type === 'sauce'),
    [ingredientsItems]
  );
  const ingredientsTypeMain = useMemo(
    () => ingredientsItems.filter((i) => i.type === 'main'),
    [ingredientsItems]
  );

  const selectedItems = useMemo(() => {
    const items = burger.bun ? { [burger.bun._id]: 2 } : {};
    burger.ingredients.forEach(({ _id }) => {
      items[_id] = items[_id] + 1 || 1;
    });
    return items;
  }, [burger]);

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
      <ul className={`${styles.categories} scroll`}>
        <li key='buns' ref={refs['buns']}>
          <h2 className='text text_type_main-medium'>Булки</h2>
          <div className='mt-6 mr-2 mb-10 ml-4'>
            <ul className={`${styles.ingredients}`}>
              {ingredientsTypeBun.map((item) => (
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
              {ingredientsTypeSauce.map((item) => (
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
              {ingredientsTypeMain.map((item) => (
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
