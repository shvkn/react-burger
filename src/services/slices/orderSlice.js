import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postOrderRequest } from '../../utils/burger-api';
import { processFulfilled, processPending, processRejected } from '../../utils/utils';

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
      .addCase(makeOrder.pending, processPending)
      .addCase(makeOrder.rejected, processRejected)
      .addCase(makeOrder.fulfilled, (state, { payload: { order } }) => {
        processFulfilled(state);
        state.number = order.number;
      });
  },
});

export default orderSlice.reducer;
