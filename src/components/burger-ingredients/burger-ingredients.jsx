import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentIngredient, setCurrentIngredient } from '../../services/actions/ingredients';
import { IngredientTypes } from '../../utils/constants';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { selectAllIngredients } from '../../services/slices/ingredientsSlice';

function BurgerIngredients() {
  const dispatch = useDispatch();
  // const { ingredientsItems, currentIngredient } = useSelector((store) => store.ingredients);
  const burger = useSelector((store) => store.burger);
  const [currentTab, setCurrentTab] = useState('');
  const ingredientsItems = useSelector(selectAllIngredients);
  const currentIngredient = null;

  const ingredientsByType = useMemo(
    () => ({
      bun: {
        ref: null,
        items: ingredientsItems.filter(({ type }) => type === IngredientTypes.BUN),
        title: 'Булки',
      },
      sauce: {
        ref: null,
        items: ingredientsItems.filter(({ type }) => type === IngredientTypes.SAUCE),
        title: 'Соусы',
      },
      main: {
        ref: null,
        items: ingredientsItems.filter(({ type }) => type === IngredientTypes.MAIN),
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
            setCurrentTab(entry.target.dataset.tab);
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
          <li key={type} ref={ingredientsByType[type].ref} data-tab={type}>
            <IngredientsCategory
              onIngredientClick={handleOpenModal}
              title={ingredientsByType[type].title}
              items={ingredientsByType[type].items}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BurgerIngredients;
