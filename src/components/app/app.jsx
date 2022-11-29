import React, { useEffect } from 'react';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { selectIngredientsSlice } from '../../utils/selectors';
function App() {
  const ingredients = useSelector(selectIngredientsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        {(ingredients.loadingState === 'loading' || ingredients.error) && (
          <p className={`text text_type_main-large text_color_inactive ${styles.message}`}>
            {ingredients.loadingState === 'loading'
              ? 'Загрузка данных'
              : ingredients.error
              ? 'Ошибка загрузки данных'
              : ''}
          </p>
        )}
        {ingredients.loadingState === 'idle' && !ingredients.error && (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <div className='ml-10 pt-25'>
                <BurgerConstructor />
              </div>
            </DndProvider>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
