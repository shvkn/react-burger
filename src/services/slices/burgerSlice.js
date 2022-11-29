import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: [],
};

const setBun = (state, { payload: id }) => {
  state.bun = id;
};

const addIngredient = {
  reducer: (state, { payload: { id, uid } }) => {
    state.ingredients.push({ id, uid });
  },
  prepare: (id) => {
    return { payload: { id, uid: nanoid() } };
  },
};

const removeIngredient = (state, { payload: index }) => {
  state.ingredients.splice(index, 1);
};

const moveIngredient = (state, { payload: { hoverIndex, dragIndex } }) => {
  const [dragElement] = state.ingredients.splice(dragIndex, 1);
  state.ingredients.splice(hoverIndex, 0, dragElement);
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setBun,
    addIngredient,
    removeIngredient,
    moveIngredient,
  },
});

export const { actions } = burgerSlice;
export default burgerSlice.reducer;
