import { ORDER_MAKE_FAILED, ORDER_MAKE_REQUEST, ORDER_MAKE_SUCCESS } from '../actions/order';

export const orderInitState = {
  number: null,
  isRequested: false,
  isFailed: false,
  isSucceed: false,
};
export const orderReducer = (state, action) => {
  switch (action.type) {
    case ORDER_MAKE_REQUEST: {
      return {
        ...state,
        isRequested: true,
        isFailed: false,
        isSucceed: false,
      };
    }

    case ORDER_MAKE_FAILED: {
      return {
        ...state,
        isFailed: true,
        isRequested: false,
        isSucceed: false,
      };
    }

    case ORDER_MAKE_SUCCESS: {
      return {
        ...state,
        number: action.number,
        isRequested: false,
        isFailed: false,
        isSucceed: true,
      };
    }
    default:
      return state;
  }
};
