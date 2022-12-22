import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const { actions } = authSlice;
export default authSlice.reducer;
