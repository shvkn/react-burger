import { createSlice, nanoid } from '@reduxjs/toolkit';
import { makeOrder } from './orderSlice';

const initialState = {
  bun: null,
  ingredients: [],
  counts: {},
};

const setBun = (state, { payload: id }) => {
  delete state.counts[state.bun];
  state.bun = id;
  state.counts[id] = 2;
};

const addIngredient = {
  reducer: (state, { payload: { id, uid } }) => {
    state.ingredients.push({ id, uid });
    state.counts[id] = state.counts[id] + 1 || 1;
  },
  prepare: (id) => {
    return { payload: { id, uid: nanoid() } };
  },
};

const removeIngredient = (state, { payload: index }) => {
  const { id } = state.ingredients[index];
  state.ingredients.splice(index, 1);
  state.counts[id] = state.counts[id] - 1;
  if (state.counts[id] <= 0) delete state.counts[id];
};

const moveIngredient = (state, { payload: { hoverIndex, dragIndex } }) => {
  const [dragElement] = state.ingredients.splice(dragIndex, 1);
  state.ingredients.splice(hoverIndex, 0, dragElement);
};

const reset = (state) => (state = { ...initialState });

const burgerSlice = createSlice({
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

export const { actions } = burgerSlice;
export default burgerSlice.reducer;
