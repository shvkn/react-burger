import { ADD_INGREDIENT, REMOVE_INGREDIENT, RESET } from '../actions/burger-constructor';

export const burgerConstructorInitState = {
  bun: null,
  ingredients: [],
  totalPrice: 0,
};

export const burgerConstructorReducer = (state, action) => {
  const calcTotalPrice = (ingredients, bun) => {
    return ingredients.reduce((sum, { price }) => sum + price, 0) + bun.price * 2;
  };
  switch (action.type) {
    case ADD_INGREDIENT: {
      const bun = action.ingredient.type === 'bun' ? action.ingredient : state.bun;
      const ingredients =
        action.ingredient.type === 'bun'
          ? state.ingredients
          : [...state.ingredients, action.ingredient];
      return {
        ...state,
        bun,
        ingredients,
        totalPrice: calcTotalPrice(ingredients, bun),
      };
    }

    case REMOVE_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.index, 1);
      return {
        ...state,
        ingredients,
        totalPrice: calcTotalPrice(ingredients, state.bun),
      };
    }

    case RESET: {
      return burgerConstructorInitState;
    }
    default:
      return state;
  }
};
