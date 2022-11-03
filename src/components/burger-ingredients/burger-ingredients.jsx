import React, { useState } from 'react';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { burgerStatePropTypes, ingredientPropTypes } from '../../utils/prop-types';
import Modal from '../modal/modal';

function BurgerIngredient({ ingredient: { image, name, price }, count }) {
  return (
    // TODO Временно отключено из-за якорной ссылки
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href='#' className={styles.ingredient}>
      {count > 0 && <Counter count={count} size='default' />}
      <img className={`ml-4 mr-4 mb-2 ${styles.ingredientImage}`} src={image} alt={name} />
      <div className={`${styles.ingredientPrice}`}>
        <p className='mr-2 text text_type_digits-default'>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <h3 className='mt-2 text text_type_main-default'>{name}</h3>
    </a>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  count: PropTypes.number.isRequired,
};

function BurgerIngredients({ ingredients, state, categoryTypes }) {
  const [currentTab, setCurrentTab] = useState(categoryTypes[0].key);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  const modal = (
    <Modal handleClose={handleCloseModal} header='Детали ингридиента'>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, magni?
    </Modal>
  );
  return (
    <section className={styles.burgerIngredients}>
      {isModalOpened && modal}
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
                      type === 'bun' && _id === state.bun
                        ? 1
                        : state.ingredients.filter((i) => i === _id).length;

                    return (
                      <li key={_id} onClick={handleOpenModal}>
                        <BurgerIngredient ingredient={ingredient} count={count} />
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
  state: burgerStatePropTypes.isRequired,
  categoryTypes: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerIngredients;
