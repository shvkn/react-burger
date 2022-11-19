export const BURGER_ADD_INGREDIENT = 'BURGER_ADD_INGREDIENT';
export const BURGER_REMOVE_INGREDIENT = 'BURGER_REMOVE_INGREDIENT';
export const BURGER_RESET = 'BURGER_RESET';

export const fillBurgerIngredients = (bun, ingredients) => (dispatch) => {
  dispatch({ type: BURGER_RESET });
  dispatch({
    type: BURGER_ADD_INGREDIENT,
    ingredient: bun,
  });
  ingredients.forEach((ingredient) => dispatch({ type: BURGER_ADD_INGREDIENT, ingredient }));
};

export const removeBurgerIngredientByIndex = (index) => (dispatch) => {
  dispatch({ type: BURGER_REMOVE_INGREDIENT, index });
};
