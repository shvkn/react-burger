import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector } from 'react-redux';
import { IngredientTypes } from '../../utils/constants';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { selectIngredients } from '../../utils/selectors';

const typeBun = IngredientTypes.BUN;
const typeSauce = IngredientTypes.SAUCE;
const typeMain = IngredientTypes.MAIN;

function BurgerIngredients() {
  const [activeTab, setActiveTab] = useState(typeBun);
  const ingredients = useSelector(selectIngredients);

  const ingredientsTypeBun = useMemo(
    () => ingredients.filter(({ type }) => type === typeBun),
    [ingredients]
  );
  const ingredientsTypeSauce = useMemo(
    () => ingredients.filter(({ type }) => type === typeSauce),
    [ingredients]
  );
  const ingredientsTypeMain = useMemo(
    () => ingredients.filter(({ type }) => type === typeMain),
    [ingredients]
  );

  const [currentIngredient, setCurrentIngredient] = useState(null);

  const categoriesRootRef = useRef();
  const categoriesRefs = {
    [typeBun]: useRef(),
    [typeMain]: useRef(),
    [typeSauce]: useRef(),
  };

  useEffect(() => {
    const createTabObserver = () => {
      return new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const tabValue = entry.target.dataset.tab;
              if (tabValue === activeTab) return;
              setActiveTab(tabValue);
            }
          }),
        {
          root: categoriesRootRef.current,
          rootMargin: '-50% 0px',
        }
      );
    };
    const observer = createTabObserver();
    Object.values(categoriesRefs).forEach((ref) => observer.observe(ref.current));
  }, [categoriesRefs]);

  const handleTabClick = (type) => {
    setActiveTab(type);
    categoriesRefs[type].current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenModal = useCallback((ingredient) => {
    setCurrentIngredient(ingredient);
  }, []);

  const handleCloseModal = () => {
    setCurrentIngredient(null);
  };

  return (
    <section className={styles.burgerIngredients}>
      {currentIngredient && (
        <Modal handleClose={handleCloseModal} title='???????????? ??????????????????????'>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      <h1 className='mt-10 mb-5 heading text text_type_main-large'>???????????????? ????????????</h1>
      <div className='mb-10'>
        <ul className={`${styles.tabs}`}>
          <>
            <li key={typeBun}>
              <Tab active={activeTab === typeBun} value={typeBun} onClick={handleTabClick}>
                ??????????
              </Tab>
            </li>
            <li key={typeSauce}>
              <Tab active={activeTab === typeSauce} value={typeSauce} onClick={handleTabClick}>
                ??????????
              </Tab>
            </li>
            <li key={typeMain}>
              <Tab active={activeTab === typeMain} value={typeMain} onClick={handleTabClick}>
                ??????????????
              </Tab>
            </li>
          </>
        </ul>
      </div>
      <ul className={`${styles.categories} scroll`} ref={categoriesRootRef}>
        <li key={typeBun} ref={categoriesRefs[typeBun]} data-tab={typeBun}>
          <IngredientsCategory
            onIngredientClick={handleOpenModal}
            title={'??????????'}
            items={ingredientsTypeBun}
          />
        </li>
        <li key={typeSauce} ref={categoriesRefs[typeSauce]} data-tab={typeSauce}>
          <IngredientsCategory
            onIngredientClick={handleOpenModal}
            title={'??????????'}
            items={ingredientsTypeSauce}
          />
        </li>
        <li key={typeMain} ref={categoriesRefs[typeMain]} data-tab={typeMain}>
          <IngredientsCategory
            onIngredientClick={handleOpenModal}
            title={'??????????????'}
            items={ingredientsTypeMain}
          />
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;
