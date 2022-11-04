import React, { useEffect, useState } from 'react';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';
import { BURGER_STATE_MOCKUP, CATEGORY_TYPES, domainUrl } from '../../utils/constants';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      setIsLoading(true);
      const response = await fetch(`${domainUrl}/api/ingredients`);
      if (!response.ok) {
        throw new Error(`Error while fetching 'Ingredients' from API ${response.status}`);
      }
      const { data } = await response.json();
      setIngredients(data);
    };
    getIngredients()
      .catch((error) => {
        setHasError(true);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        {!hasError && !isLoading && ingredients.length && (
          <>
            <BurgerIngredients
              ingredients={ingredients}
              order={BURGER_STATE_MOCKUP}
              categoryTypes={CATEGORY_TYPES}
            />
            <div className='ml-10 pt-25'>
              <BurgerConstructor ingredients={ingredients} order={BURGER_STATE_MOCKUP} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
