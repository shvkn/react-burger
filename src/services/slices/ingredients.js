import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients, ingredientsAdapter } from '../actions/ingredients';

const initialState = ingredientsAdapter.getInitialState({ isLoading: false, error: null });

const ingredients = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload: { data } }) => {
        state.isLoading = false;
        state.error = null;
        ingredientsAdapter.setAll(state, data);
      });
  },
});

export default ingredients.reducer;
