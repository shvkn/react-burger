import {
  INGREDIENTS_GET_FAILED,
  INGREDIENTS_GET_REQUESTED,
  INGREDIENTS_GET_SUCCEED,
  INGREDIENTS_RESET_CURRENT,
  INGREDIENTS_SET_CURRENT,
} from '../actions/ingredients';

export const ingredientsInitState = {
  ingredientsItems: [],
  currentIngredient: null,
  isRequested: false,
  isFailed: false,
  isSucceed: false,
};

export const ingredientsReducer = (state = ingredientsInitState, action) => {
  switch (action.type) {
    case INGREDIENTS_GET_REQUESTED: {
      return {
        ...state,
        isRequested: true,
        isFailed: false,
      };
    }
    case INGREDIENTS_GET_FAILED: {
      return {
        ...state,
        isFailed: true,
        isRequested: false,
        isSucceed: false,
      };
    }

    case INGREDIENTS_GET_SUCCEED: {
      return {
        ...state,
        ingredientsItems: action.data,
        isRequested: false,
        isFailed: false,
        isSucceed: true,
      };
    }

    case INGREDIENTS_SET_CURRENT: {
      return {
        ...state,
        currentIngredient: action.ingredient,
      };
    }

    case INGREDIENTS_RESET_CURRENT: {
      return {
        ...state,
        currentIngredient: null,
      };
    }

    default:
      return state;
  }
};
