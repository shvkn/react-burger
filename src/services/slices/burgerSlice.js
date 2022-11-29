import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';
import { selectIngredientsEntities } from './ingredientsSlice';

const initialState = {
  bun: null,
  ingredients: [],
};

const setBun = (state, { payload: id }) => {
  state.bun = id;
};

const addIngredient = {
  reducer: (state, { payload: { id, uid } }) => {
    state.ingredients.push({ id, uid });
  },
  prepare: (id) => {
    return { payload: { id, uid: nanoid() } };
  },
};

const removeIngredient = (state, { payload: index }) => {
  state.ingredients.splice(index, 1);
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setBun,
    addIngredient,
    removeIngredient,
  },
});

export const selectBurgerBun = (state) => state.burger.bun;
export const selectBurgerIngredients = (state) => state.burger.ingredients;

export const selectTotalPrice = createSelector(
  [selectBurgerBun, selectBurgerIngredients, selectIngredientsEntities],
  (bunId, ingredients, ingredientsEntities) =>
    ingredients
      .map(({ id }) => ingredientsEntities[id].price)
      .reduce((total, price) => total + price, 0) +
    (bunId ? ingredientsEntities[bunId].price * 2 : 0)
);

export const { actions } = burgerSlice;
export default burgerSlice.reducer;
