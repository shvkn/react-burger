import {
  INGREDIENTS_GET_FAILED,
  INGREDIENTS_GET_REQUESTED,
  INGREDIENTS_GET_SUCCEED,
} from '../actions/ingredients';

export const ingredientsInitState = {
  items: [],
  isRequested: false,
  isFailed: false,
  isSucceed: false,
};

export const ingredientsReducer = (state, action) => {
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
        items: action.data,
        isRequested: false,
        isFailed: false,
        isSucceed: true,
      };
    }

    default:
      return state;
  }
};
