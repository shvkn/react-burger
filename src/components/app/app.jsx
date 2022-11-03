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
    pending: false,
    error: false,
    ingredients: [],
    order: BURGER_STATE_MOCKUP,
  });

  useEffect(() => {
    setState({ ...state, pending: true });
    fetch(`${domainUrl}/api/ingredients`)
      .then((res) => res.json())
      .then(({ success, data }) => {
        if (success) {
          setState({ ...state, pending: false, error: false, ingredients: data });
        } else {
          setState({ ...state, pending: false, error: true });
        }
      })
      .catch((error) => {
        setState({ ...state, pending: false, error: true });
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        {!state.error && !state.pending && state.ingredients.length > 0 && (
          <>
            <BurgerIngredients
              ingredients={state.ingredients}
              state={state.order}
              categoryTypes={CATEGORY_TYPES}
            />
            <div className='ml-10 pt-25'>
              <BurgerConstructor ingredients={state.ingredients} state={state.order} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
