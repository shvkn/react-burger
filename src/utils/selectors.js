import { createSelector } from '@reduxjs/toolkit';
import {
  selectAllIngredients,
  selectIngredientsEntities,
} from '../services/slices/ingredientsSlice';

export const selectIngredientsSlice = (state) => state.ingredients;
export const selectOrderSlice = (state) => state.order;
export const selectBurgerSlice = (state) => state.burger;

export const selectBurgerBun = createSelector(selectBurgerSlice, (burger) => burger.bun);
export const selectBurgerIngredients = createSelector(
  selectBurgerSlice,
  (burger) => burger.ingredients
);

export const selectTotalPrice = createSelector(
  [selectBurgerBun, selectBurgerIngredients, selectIngredientsEntities],
  (bunId, ingredients, ingredientsEntities) =>
    ingredients
      .map(({ id }) => ingredientsEntities[id].price)
      .reduce((total, price) => total + price, 0) +
    (bunId ? ingredientsEntities[bunId].price * 2 : 0)
);

export const selectIngredientsByType = createSelector(
  [selectAllIngredients, (state, type) => type],
  (ingredients, type) => ingredients.filter((ingredient) => ingredient.type === type)
);

export const selectOrderNumber = createSelector(selectOrderSlice, (order) => order.number);

export const selectIsBurgerBunEmpty = createSelector(selectBurgerBun, (bun) => bun === null);
export const selectIsBurgerIngredientsEmpty = createSelector(
  selectBurgerIngredients,
  (ingredients) => ingredients.length === 0
);
