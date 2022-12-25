import { createSlice } from '@reduxjs/toolkit';
import { addIngredient, moveIngredient, removeIngredient, reset, setBun } from '../actions/burger';
import { makeOrder } from '../actions/order';

export const initialState = {
  bun: null,
  ingredients: [],
  counts: {},
};

const burger = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setBun,
    addIngredient,
    removeIngredient,
    moveIngredient,
    reset,
  },
  extraReducers: (builder) => {
    builder.addCase(makeOrder.fulfilled, reset);
  },
});

export const { actions } = burger;
export default burger.reducer;
