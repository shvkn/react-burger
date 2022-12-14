import styles from '../burger-ingredient/burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { ingredientPropTypes } from '../../utils/prop-types';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { selectIngredientCountById } from '../../utils/selectors';

function BurgerIngredient({ ingredient, handleClick }) {
  const id = ingredient._id;
  const count = useSelector(selectIngredientCountById(id));
  const [, dragRef] = useDrag({
    type: ItemTypes.BURGER_INGREDIENT,
    item: { id },
  });
  return (
    <article className={styles.ingredient} onClick={() => handleClick(ingredient)} ref={dragRef}>
      {count > 0 && <Counter count={count} size='default' />}
      <img
        className={`ml-4 mr-4 mb-2 ${styles.ingredientImage}`}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <div className={`${styles.ingredientPrice}`}>
        <p className='mr-2 text text_type_digits-default'>{ingredient.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <h3 className='mt-2 text text_type_main-default'>{ingredient.name}</h3>
    </article>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default React.memo(BurgerIngredient);
