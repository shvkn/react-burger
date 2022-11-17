import React, { useEffect, useReducer } from 'react';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredients } from '../../utils/burger-api';
import { ingredientsInitState, ingredientsReducer } from '../../services/reducers';
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../../services/actions';

function App() {
  const [ingredients, dispatch] = useReducer(ingredientsReducer, ingredientsInitState);

  useEffect(() => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    getIngredients()
      .then(({ data }) => dispatch({ type: GET_INGREDIENTS_SUCCESS, data: data }))
      .catch((error) => dispatch({ type: GET_INGREDIENTS_FAILED, error }));
  }, []);

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
        {!ingredients.isFailed && !ingredients.isRequested && ingredients.items.length && (
          <>
            <BurgerIngredients ingredients={ingredients.items} />
            <div className='ml-10 pt-25'>
              <BurgerConstructor ingredients={ingredients.items} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
