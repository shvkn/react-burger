import { IngredientTypes } from '../../utils/constants';
import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';
import { selectIngredientsEntities } from './ingredientsSlice';

const initialState = {
  bun: null,
  ingredients: [],
};

const addIngredient = {
  reducer: (state, { payload: { type, _id, uid } }) => {
    if (type === IngredientTypes.BUN) {
      state.bun = _id;
    } else {
      state.ingredients.push({ _id, uid });
    }
  },
  prepare: (ingredient) => {
    return ingredient.type === IngredientTypes.BUN
      ? { payload: ingredient }
      : { payload: { ...ingredient, uid: nanoid() } };
  },
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient,
  },
});

const burgerBun = (state) => state.burger.bun;
const burgerIngredients = (state) => state.burger.ingredients;

export const selectTotalPrice = createSelector(
  [burgerBun, burgerIngredients, selectIngredientsEntities],
  (bun, ingredients, ingredientsEntities) =>
    ingredients
      .map(({ _id }) => ingredientsEntities[_id].price)
      .reduce((total, price) => total + price, 0)
);

export const { actions } = burgerSlice;
export default burgerSlice.reducer;
