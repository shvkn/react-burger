import React from 'react';
import '../../style/common.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';
import { BURGER_STATE_MOCKUP, CATEGORY_TYPES } from '../../utils/constants';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        <BurgerIngredients
          ingredients={data}
          state={BURGER_STATE_MOCKUP}
          categoryTypes={CATEGORY_TYPES}
        />
        <div className='ml-10 pt-25'>
          <BurgerConstructor ingredients={data} state={BURGER_STATE_MOCKUP} />
        </div>
      </main>
    </div>
  );
}

export default App;
