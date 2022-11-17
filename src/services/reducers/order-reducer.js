import {
  ORDER_MAKE_FAILED,
  ORDER_MAKE_REQUEST,
  ORDER_MAKE_SUCCESS,
} from '../actions/burger-constructor';

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

    case ORDER_MAKE_FAILED: {
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
