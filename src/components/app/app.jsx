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
  INGREDIENTS_GET_FAILED,
  INGREDIENTS_GET_REQUESTED,
  INGREDIENTS_GET_SUCCEED,
} from '../../services/actions';
import { IngredientsContext } from '../../services/context/ingredients-context';
import { burgerInitState, burgerReducer } from '../../services/reducers/burger-reducer';
import { BurgerConstructorContext } from '../../services/context/burger-constructor-context';

function App() {
  const [ingredients, dispatchIngredients] = useReducer(ingredientsReducer, ingredientsInitState);
  const [burger, dispatchBurger] = useReducer(burgerReducer, burgerInitState);

  useEffect(() => {
    dispatchIngredients({ type: INGREDIENTS_GET_REQUESTED });
    getIngredients()
      .then(({ data }) => dispatchIngredients({ type: INGREDIENTS_GET_SUCCEED, data }))
      .catch((error) => dispatchIngredients({ type: INGREDIENTS_GET_FAILED, error }));
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
        {ingredients.isSucceed && ingredients.items.length && (
          <IngredientsContext.Provider value={ingredients.items}>
            <BurgerConstructorContext.Provider value={{ burger, dispatchBurger }}>
              <BurgerIngredients />
              <div className='ml-10 pt-25'>
                <BurgerConstructor />
              </div>
            </BurgerConstructorContext.Provider>
          </IngredientsContext.Provider>
        )}
      </main>
    </div>
  );
}

export default App;
