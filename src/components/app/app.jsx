import React, { useEffect } from 'react';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';

import { getIngredients } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const ingredients = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        {(ingredients.isRequested || ingredients.isFailed) && (
          <p className={`text text_type_main-large text_color_inactive ${styles.message}`}>
            {ingredients.isRequested
              ? 'Загрузка данных'
              : ingredients.isFailed
              ? 'Ошибка загрузки данных'
              : ''}
          </p>
        )}
        {ingredients.isSucceed && ingredients.ingredientsItems.length && (
          <>
            <BurgerIngredients />
            <div className='ml-10 pt-25'>
              <BurgerConstructor />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
