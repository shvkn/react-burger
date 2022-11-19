import React, { useEffect, useReducer } from 'react';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredients } from '../../utils/burger-api';

import {
  INGREDIENTS_GET_FAILED,
  INGREDIENTS_GET_REQUESTED,
  INGREDIENTS_GET_SUCCEED,
} from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';

const getIngredientsThunk = () => (dispatch) => {
  dispatch({ type: INGREDIENTS_GET_REQUESTED });
  getIngredients()
    .then(({ data }) => dispatch({ type: INGREDIENTS_GET_SUCCEED, data }))
    .catch((error) => dispatch({ type: INGREDIENTS_GET_FAILED, error }));
};

function App() {
  const ingredients = useSelector((store) => store.ingredientsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
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
        {ingredients.isSucceed && ingredients.items.length && (
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
