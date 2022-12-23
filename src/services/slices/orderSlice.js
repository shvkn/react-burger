import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postOrderRequest } from '../../utils/burger-api';

const initialState = {
  number: null,
  isLoading: false,
  error: null,
};

export const makeOrder = createAsyncThunk('order/makeOrder', async (ingredientsIds) =>
  postOrderRequest(ingredientsIds)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(makeOrder.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(makeOrder.fulfilled, (state, { payload: { order } }) => {
        state.number = order.number;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default orderSlice.reducer;
