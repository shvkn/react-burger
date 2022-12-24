import React from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from '../page.module.css';
function IngredientPage() {
  return (
    <div className={`${styles.container}`}>
      <IngredientDetails />
    </div>
  );
}

export default IngredientPage;
