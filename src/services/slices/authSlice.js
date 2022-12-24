import { createSlice } from '@reduxjs/toolkit';
import { processError, setCredentials } from '../../utils/utils';
import { getUser, login, logout, registerUser } from '../actions/auth';

const initialState = { user: null, isLoading: false, error: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload: { success, message, user, accessToken, refreshToken } }) => {
          if (success) {
            state.user = user;
            setCredentials(accessToken, refreshToken);
          } else {
            processError(message);
          }
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(
        login.fulfilled,
        (state, { payload: { success, message, user, accessToken, refreshToken } }) => {
          if (success) {
            state.user = user;
            setCredentials(accessToken, refreshToken);
          } else {
            processError(message);
          }
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(logout.fulfilled, (state, { payload: { message, success } }) => {
        if (success) {
          state = initialState;
        } else {
          processError(message);
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addCase(getUser.fulfilled, (state, { payload: { user, success, message } }) => {
        if (success) {
          state.user = user;
        } else {
          console.log('message', message);
          // processError(message);
        }
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
