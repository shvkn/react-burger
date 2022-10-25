import React from 'react';
import styles from './app-main.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function AppMain({data, dataTypes, state}) {

  return (
    <main className={`${styles.main}`}>
      <div>
        <BurgerIngredients ingredients={data} state={state} types={dataTypes} defaultTab={dataTypes[0].key}/>
      </div>
      <div className={`ml-10 pt-25`}>
        <BurgerConstructor ingredients={data} state={state}/>
      </div>
    </main>
  )
}

export default AppMain;
