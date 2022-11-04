import React, { useEffect, useState } from 'react';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';
import { BURGER_STATE_MOCKUP, CATEGORY_TYPES, domainUrl } from '../../utils/constants';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
    order: BURGER_STATE_MOCKUP,
  });

  useEffect(() => {
    const getIngredients = async () => {
      setState({ ...state, isLoading: true });
      const response = await fetch(`${domainUrl}/api/ingredients`);
      if (!response.ok) {
        throw new Error(`Error while fetching 'Ingredients' from API ${response.status}`);
      }
      try {
        const { data } = await response.json();
        setState({ ...state, isLoading: false, ingredients: data });
      } catch (error) {
        setState({ ...state, isLoading: false, isError: true });
        console.log(error);
      }
    };
    getIngredients();
    // TODO
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        {!state.hasError && !state.isLoading && state.ingredients.length > 0 && (
          <>
            <BurgerIngredients
              ingredients={state.ingredients}
              order={state.order}
              categoryTypes={CATEGORY_TYPES}
            />
            <div className='ml-10 pt-25'>
              <BurgerConstructor ingredients={state.ingredients} order={state.order} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
