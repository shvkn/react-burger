import React, { useEffect, useState } from 'react';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';
import { BURGER_STATE_MOCKUP, CATEGORY_TYPES, NORMA_API } from '../../utils/constants';
import { getIngredients } from '../../utils/burger-api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getIngredients()
      .then(({ data }) => setIngredients(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        {(isLoading || error) && (
          <p className={`text text_type_main-large text_color_inactive ${styles.message}`}>
            {isLoading ? 'Загрузка данных' : error ? `Ошибка: ${error.message}` : ''}
          </p>
        )}
        {!error && !isLoading && ingredients.length && (
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
