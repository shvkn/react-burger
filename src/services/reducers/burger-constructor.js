import {
  CONSTRUCTOR_ADD_INGREDIENT,
  ORDER_MAKE_FAIL,
  ORDER_MAKE_REQUEST,
  ORDER_MAKE_SUCCESS,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_RESET,
} from '../actions/burger-constructor';

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
    case CONSTRUCTOR_ADD_INGREDIENT: {
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

    case CONSTRUCTOR_REMOVE_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.index, 1);
      return {
        ...state,
        ingredients,
        totalPrice: calcTotalPrice(ingredients, state.bun),
      };
    }

    case CONSTRUCTOR_RESET: {
      return burgerConstructorInitState;
    }
    default:
      return state;
  }
};
export const orderInitState = {
  number: null,
  isRequested: false,
  isFailed: false,
};
export const orderReducer = (state, action) => {
  switch (action.type) {
    case ORDER_MAKE_REQUEST: {
      return {
        ...state,
        isRequested: true,
      };
    }

    case ORDER_MAKE_FAIL: {
      return {
        ...state,
        isFailed: true,
        isRequested: false,
      };
    }

    case ORDER_MAKE_SUCCESS: {
      return {
        ...state,
        number: action.number,
      };
    }
    default:
      return state;
  }
};
