import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../actions';

export const ingredientsInitState = {
  items: [],
  isRequested: false,
  isFailed: false,
};

export const ingredientsReducer = (state, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isRequested: true,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isRequested: false,
        isFailed: true,
      };
    }

    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.data,
        isRequested: false,
        isFailed: false,
      };
    }

    default:
      return state;
  }
};
