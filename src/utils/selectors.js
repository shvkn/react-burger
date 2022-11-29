import { createSelector } from '@reduxjs/toolkit';
import {
  selectAllIngredients,
  selectIngredientsEntities,
} from '../services/slices/ingredientsSlice';

export const selectIngredientsSlice = (state) => state.ingredients;
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

export const selectIngredientsByType = createSelector(
  [selectAllIngredients, (state, type) => type],
  (ingredients, type) => ingredients.filter((ingredient) => ingredient.type === type)
);
