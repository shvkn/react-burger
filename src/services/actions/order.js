import { postOrderRequest } from '../../utils/burger-api';
import { BURGER_RESET } from './burger';

export const ORDER_MAKE_REQUEST = 'ORDER_MAKE_REQUEST';
export const ORDER_MAKE_FAILED = 'ORDER_MAKE_FAILED';
export const ORDER_MAKE_SUCCESS = 'ORDER_MAKE_SUCCESS';

export const makeOrder = (items) => (dispatch) => {
  dispatch({ type: ORDER_MAKE_REQUEST });
  postOrderRequest(items)
    .then(({ success, order }) => {
      if (!success) throw new Error(`Error in "postOrder"`);
      dispatch({ type: ORDER_MAKE_SUCCESS, number: order.number });
      dispatch({ type: BURGER_RESET });
    })
    .catch((error) => {
      console.error(error);
      dispatch({ type: ORDER_MAKE_FAILED });
    });
};
