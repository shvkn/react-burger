export const BURGER_ADD_INGREDIENT = 'BURGER_ADD_INGREDIENT';
export const BURGER_REMOVE_INGREDIENT = 'BURGER_REMOVE_INGREDIENT';
export const BURGER_RESET = 'BURGER_RESET';

export const removeBurgerIngredientByIndex = (index) => (dispatch) => {
  dispatch({ type: BURGER_REMOVE_INGREDIENT, index });
};

export const addBurgerIngredient = (ingredient) => (dispatch) => {
  dispatch({ type: BURGER_ADD_INGREDIENT, ingredient });
};
