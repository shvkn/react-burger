import uniqid from 'uniqid';
import { IngredientTypes } from '../../utils/constants';

export const BURGER_ADD_INGREDIENT = 'BURGER_ADD_INGREDIENT';
export const BURGER_REMOVE_INGREDIENT = 'BURGER_REMOVE_INGREDIENT';
export const BURGER_RESET = 'BURGER_RESET';
export const BURGER_MOVE_INGREDIENT = 'BURGER_MOVE_INGREDIENT';

export const removeBurgerIngredientByIndex = (index) => (dispatch) => {
  dispatch({ type: BURGER_REMOVE_INGREDIENT, index });
};

export const addBurgerIngredient = (ingredient) => (dispatch) => {
  const uid = uniqid();
  dispatch({ type: BURGER_ADD_INGREDIENT, ingredient: { ...ingredient, uid } });
};

export const moveBurgerIngredient = (hoverIndex, dragIndex) => (dispatch) => {
  dispatch({ type: BURGER_MOVE_INGREDIENT, hoverIndex, dragIndex });
};

export const resetBurgerIngredients = () => (dispatch, getState) => {
  const { ingredients } = getState();
  const bun = ingredients.ingredientsItems.find(({ type }) => type === IngredientTypes.BUN);
  dispatch({ type: BURGER_RESET });
  dispatch(addBurgerIngredient(bun));
};
