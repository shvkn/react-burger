import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIngredientsSlice } from '../utils/selectors';
import styles from '../components/app/app.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { fetchIngredients } from '../services/slices/ingredientsSlice';

function ConstructorPage() {
  const ingredients = useSelector(selectIngredientsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      {(ingredients.isLoading || ingredients.error) && (
        <p className={`text text_type_main-large text_color_inactive ${styles.message}`}>
          {ingredients.isLoading
            ? 'Загрузка данных'
            : ingredients.error
            ? 'Ошибка загрузки данных'
            : ''}
        </p>
      )}
      {!ingredients.isLoading && !ingredients.error && (
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <div className='ml-10 pt-25'>
              <BurgerConstructor />
            </div>
          </DndProvider>
        </>
      )}
    </>
  );
}

export default ConstructorPage;
