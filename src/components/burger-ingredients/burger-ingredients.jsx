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

  const ingredientsByType = useMemo(
    () => ({
      bun: {
        ref: null,
        items: ingredientsItems.filter(({ type }) => type === 'bun'),
        title: 'Булки',
      },
      sauce: {
        ref: null,
        items: ingredientsItems.filter(({ type }) => type === 'sauce'),
        title: 'Соусы',
      },
      main: {
        ref: null,
        items: ingredientsItems.filter(({ type }) => type === 'main'),
        title: 'Начинки',
      },
    }),
    [ingredientsItems]
  );

  const ingredientsTypesList = useMemo(
    () => Array.from(Object.keys(ingredientsByType)),
    [ingredientsByType]
  );
  ingredientsByType.bun.ref = useRef();
  ingredientsByType.sauce.ref = useRef();
  ingredientsByType.main.ref = useRef();

  const ingredientsRootRef = useRef();

  const observeCurrentTab = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentTab(entry.target.id);
          }
        });
      },
      {
        root: ingredientsRootRef.current,
        rootMargin: '-50% 0px',
      }
    );
    ingredientsTypesList.forEach((type) => observer.observe(ingredientsByType[type].ref.current));
  }, [ingredientsRootRef, ingredientsByType, ingredientsTypesList]);

  useEffect(() => {
    observeCurrentTab();
  }, [observeCurrentTab]);

  const selectedItems = useMemo(() => {
    const items = burger.bun ? { [burger.bun._id]: 2 } : {};
    burger.ingredients.forEach(({ _id }) => {
      items[_id] = items[_id] + 1 || 1;
    });
    return items;
  }, [burger]);

  const handleTabClick = (type) => {
    setCurrentTab(type);
    ingredientsByType[type].ref.current.scrollIntoView({ behavior: 'smooth' });
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
          {ingredientsTypesList.map((type) => (
            <li key={type}>
              <Tab active={currentTab === type} value={type} onClick={handleTabClick}>
                {ingredientsByType[type].title}
              </Tab>
            </li>
          ))}
        </ul>
      </div>
      <ul className={`${styles.categories} scroll`} ref={ingredientsRootRef}>
        {ingredientsTypesList.map((type) => (
          <li id={type} key={type} ref={ingredientsByType[type].ref}>
            <h2 className='text text_type_main-medium'>{ingredientsByType[type].title}</h2>
            <div className='pt-6 pr-2 pb-10 pl-4'>
              <ul className={`${styles.ingredients}`}>
                {ingredientsByType[type].items.map((item) => (
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
        ))}
      </ul>
    </section>
  );
}

export default BurgerIngredients;
