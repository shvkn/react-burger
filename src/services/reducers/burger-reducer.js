import { BURGER_ADD_INGREDIENT, BURGER_REMOVE_INGREDIENT, BURGER_RESET } from '../actions/burger';

export const burgerInitState = {
  bun: null,
  ingredients: [],
  totalPrice: 0,
};

export const burgerReducer = (state, action) => {
  const isBun = () => action.ingredient.type === 'bun';
  const calcTotalPrice = (ingredients, bun) =>
    ingredients.reduce((sum, { price }) => sum + price, 0) + bun.price * 2;

  switch (action.type) {
    case BURGER_ADD_INGREDIENT: {
      const bun = isBun() ? action.ingredient : state.bun;
      const ingredients = isBun() ? state.ingredients : [...state.ingredients, action.ingredient];
      return {
        ...state,
        bun,
        ingredients,
        totalPrice: calcTotalPrice(ingredients, bun),
      };
    }

    case BURGER_REMOVE_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.index, 1);
      return {
        ...state,
        ingredients,
        totalPrice: calcTotalPrice(ingredients, state.bun),
      };
    }

    case BURGER_RESET: {
      return burgerInitState;
    }
    default:
      return state;
  }
};
