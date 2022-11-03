import React from 'react';
import styles from './ingredient-details.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';

function IngredientDetails({ calories, carbohydrates, fat, image_large, name, proteins }) {
  return (
    <div className={`pb-15 ${styles.inner}`}>
      <img className={styles.image} src={image_large} alt={name} />
      <p className={`mt-4 mb-8 text text_type_main-medium ${styles.name}`}>{name}</p>
      <ul className={`text text_type_main-default text_color_inactive ${styles.facts}`}>
        <li className={`${styles.fact}`}>
          Калории,ккал
          <span className='mt-2 text text_type_digits-default'>{calories}</span>
        </li>
        <li className={`ml-5 ${styles.fact}`}>
          Белки, г<span className='mt-2 text text_type_digits-default'>{proteins}</span>
        </li>
        <li className={`ml-5 ${styles.fact}`}>
          Жиры, г<span className='mt-2 text text_type_digits-default'>{fat}</span>
        </li>
        <li className={`ml-5 ${styles.fact}`}>
          Углеводы, г<span className='mt-2 text text_type_digits-default'>{carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = ingredientPropTypes.isRequired;

export default IngredientDetails;
