import React, { useEffect, useState } from 'react';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { orderStatePropTypes, ingredientPropTypes } from '../../utils/prop-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function BurgerIngredient({ ingredient, count, handleClick }) {
  return (
    // TODO Временно отключено из-за якорной ссылки
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href='#' className={styles.ingredient} onClick={handleClick}>
      {count > 0 && <Counter count={ingredient.count} size='default' />}
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
    </a>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  count: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

function BurgerIngredients({ ingredients, order, categoryTypes }) {
  const [currentTab, setCurrentTab] = useState(categoryTypes[0].key);
  const [showModal, setShowModal] = useState(false);
  const [ingredient, setIngredient] = useState(undefined);

  useEffect(() => {
    setShowModal(true);
  }, [ingredient]);

  const modal = (
    <Modal handleClose={() => setShowModal(false)} title='Детали ингредиента'>
      <IngredientDetails {...ingredient} />
    </Modal>
  );

  return (
    <section className={styles.burgerIngredients}>
      {showModal && ingredient && modal}
      <h1 className='mt-10 mb-5 heading text text_type_main-large'>Соберите бургер</h1>
      <div className='mb-10'>
        <ul className={`${styles.tabs}`}>
          {categoryTypes.map(({ key, name }) => (
            <li key={key}>
              <Tab active={currentTab === key} value={key} onClick={setCurrentTab}>
                {name}
              </Tab>
            </li>
          ))}
        </ul>
      </div>
      <ul className={`${styles.categories} scroll`}>
        {categoryTypes.map(({ key, name }) => (
          <li key={key}>
            <h2 className='text text_type_main-medium'>{name}</h2>
            <div className='mt-6 mr-2 mb-10 ml-4'>
              <ul className={`${styles.ingredients}`}>
                {ingredients
                  .filter(({ type }) => type === key)
                  .map((ingredient) => {
                    const { type, _id } = ingredient;
                    const count =
                      type === 'bun' && _id === order.bun
                        ? 1
                        : order.ingredients.filter((i) => i === _id).length;

                    return (
                      <li key={_id}>
                        <BurgerIngredient
                          ingredient={ingredient}
                          count={count}
                          handleClick={() => setIngredient(ingredient)}
                        />
                      </li>
                    );
                  })}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  order: orderStatePropTypes.isRequired,
  categoryTypes: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerIngredients;
