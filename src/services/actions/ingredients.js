import { getIngredientsRequest } from '../../utils/burger-api';

export const INGREDIENTS_GET_REQUESTED = 'INGREDIENTS_GET_REQUESTED';
export const INGREDIENTS_GET_FAILED = 'INGREDIENTS_GET_FAILED';
export const INGREDIENTS_GET_SUCCEED = 'INGREDIENTS_GET_SUCCEED';
export const INGREDIENTS_SET_CURRENT = 'INGREDIENTS_SET_CURRENT';
export const INGREDIENTS_RESET_CURRENT = 'INGREDIENTS_RESET_CURRENT';

export const getIngredients = () => (dispatch) => {
  dispatch({ type: INGREDIENTS_GET_REQUESTED });
  getIngredientsRequest()
    .then(({ data }) => dispatch({ type: INGREDIENTS_GET_SUCCEED, data }))
    .catch((error) => dispatch({ type: INGREDIENTS_GET_FAILED, error }));
};
// TODO Вынести в самостоятельный редьюсер
export const setCurrentIngredient = (ingredient) => (dispatch) => {
  dispatch({ type: INGREDIENTS_SET_CURRENT, ingredient });
};

export const resetCurrentIngredient = () => (dispatch) => {
  dispatch({ type: INGREDIENTS_RESET_CURRENT });
};
