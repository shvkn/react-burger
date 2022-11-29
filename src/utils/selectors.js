import { createSelector } from '@reduxjs/toolkit';
import { ingredientsAdapter } from '../services/slices/ingredientsSlice';
export const selectIngredientsSlice = (state) => state.ingredients;
export const selectOrderSlice = (state) => state.order;
export const selectBurgerSlice = (state) => state.burger;

const ingredientsActions = ingredientsAdapter.getSelectors(selectIngredientsSlice);

export const selectIngredientsEntities = ingredientsActions.selectEntities;
export const selectIngredientById = (id) => (state) => ingredientsActions.selectById(state, id);

export const selectBurgerBun = (state) => selectBurgerSlice(state).bun;
export const selectBurgerIngredients = (state) => selectBurgerSlice(state).ingredients;
export const selectBurgerCounts = (state) => selectBurgerSlice(state).counts;

export const selectOrderNumber = (state) => selectOrderSlice(state).number;

export const selectTotalPrice = createSelector(
  [selectBurgerBun, selectBurgerIngredients, selectIngredientsEntities],
  (bunId, ingredients, ingredientsEntities) =>
    ingredients
      .map(({ id }) => ingredientsEntities[id].price)
      .reduce((total, price) => total + price, 0) +
    (bunId ? ingredientsEntities[bunId].price * 2 : 0)
);

export const selectIngredientsByType = createSelector(
  [ingredientsActions.selectAll, (state, type) => type],
  (ingredients, type) => ingredients.filter((ingredient) => ingredient.type === type)
);

export const selectIsBurgerBunEmpty = createSelector(selectBurgerBun, (bun) => bun === null);
export const selectIsBurgerIngredientsEmpty = createSelector(
  selectBurgerIngredients,
  (ingredients) => ingredients.length === 0
);
