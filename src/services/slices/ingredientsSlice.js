import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getIngredientsRequest } from '../../utils/burger-api';

export const ingredientsAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
});
const initialState = ingredientsAdapter.getInitialState({ isLoading: false, error: null });

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients', async () =>
  getIngredientsRequest()
);

const ingredientsSlice = createSlice({
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

export default ingredientsSlice.reducer;
