import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postOrderRequest } from '../../utils/burger-api';

const initialState = {
  number: null,
  loadingState: 'idle',
  error: null,
};

const processPending = (state) => {
  state.loadingState = 'loading';
  state.error = null;
};

const processRejected =
  () =>
  (state, { payload: error }) => {
    state.loadingState = 'idle';
    state.error = error;
  };

const processFulfilled = (state) => {
  state.loadingState = 'idle';
  state.error = null;
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
