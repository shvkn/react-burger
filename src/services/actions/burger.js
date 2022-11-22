import uniqid from 'uniqid';

export const BURGER_ADD_INGREDIENT = 'BURGER_ADD_INGREDIENT';
export const BURGER_REMOVE_INGREDIENT = 'BURGER_REMOVE_INGREDIENT';
export const BURGER_RESET = 'BURGER_RESET';
export const BURGER_MOVE_INGREDIENT = 'BURGER_MOVE_INGREDIENT';

export const removeBurgerIngredientByIndex = (index) => ({ type: BURGER_REMOVE_INGREDIENT, index });

export const addBurgerIngredient = (ingredient) => {
  const uid = uniqid();
  return { type: BURGER_ADD_INGREDIENT, ingredient: { ...ingredient, uid } };
};

export const moveBurgerIngredient = (hoverIndex, dragIndex) => ({
  type: BURGER_MOVE_INGREDIENT,
  hoverIndex,
  dragIndex,
});

export const resetBurgerIngredients = () => ({ type: BURGER_RESET });
