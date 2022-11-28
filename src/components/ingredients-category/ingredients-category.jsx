import React from 'react';
import PropTypes from 'prop-types';
import styles from '../burger-ingredients/burger-ingredients.module.css';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';

IngredientsCategory.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};

function IngredientsCategory({ items, title, onIngredientClick }) {
  return (
    <>
      <h2 className='text text_type_main-medium'>{title}</h2>
      <div className='pt-6 pr-2 pb-10 pl-4'>
        <ul className={`${styles.ingredients}`}>
          {items.map((item) => (
            <li key={item._id}>
              <BurgerIngredient ingredient={item} handleClick={onIngredientClick} count={1} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default IngredientsCategory;
