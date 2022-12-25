import React from 'react';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { selectIngredientById } from '../../utils/selectors';
import { useSelector } from 'react-redux';

function IngredientDetails() {
  const { id } = useParams();
  const ingredient = useSelector(selectIngredientById(id));
  return !ingredient ? null : (
    <>
      <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
      <p className={`mt-4 mb-8 text text_type_main-medium ${styles.name}`}>{ingredient.name}</p>
      <ul className={`mb-15 text text_type_main-default text_color_inactive ${styles.facts}`}>
        <li className={`${styles.fact}`}>
          Калории,ккал
          <span className='mt-2 text text_type_digits-default'>{ingredient.calories}</span>
        </li>
        <li className={`ml-5 ${styles.fact}`}>
          Белки, г<span className='mt-2 text text_type_digits-default'>{ingredient.proteins}</span>
        </li>
        <li className={`ml-5 ${styles.fact}`}>
          Жиры, г<span className='mt-2 text text_type_digits-default'>{ingredient.fat}</span>
        </li>
        <li className={`ml-5 ${styles.fact}`}>
          Углеводы, г
          <span className='mt-2 text text_type_digits-default'>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </>
  );
}

export default IngredientDetails;
