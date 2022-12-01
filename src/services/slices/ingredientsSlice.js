import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getIngredientsRequest } from '../../utils/burger-api';
import { processFulfilled, processPending, processRejected } from '../../utils/utils';

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
      .addCase(fetchIngredients.pending, processPending)
      .addCase(fetchIngredients.rejected, processRejected)
      .addCase(fetchIngredients.fulfilled, (state, { payload: { data } }) => {
        processFulfilled(state);
        ingredientsAdapter.setAll(state, data);
      });
  },
});

export default ingredientsSlice.reducer;
