import React from 'react';
import styles from './app-main.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import {types} from '../../utils/types';


function AppMain({data}) {
  return (
    <main className={`innerContainer ${styles.main}`}>

      <div className={styles.left}>
        <BurgerIngredients ingredients={data} types={types} defaultTab={types[0].key} />
      </div>

      <div className={`${styles.right} ml-10`}>
        {/*<BurgerIngredients ingredients={data}/>*/}
      </div>

    </main>
  )
}

export default AppMain;
