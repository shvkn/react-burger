import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginRequest, logoutRequest, registerUserRequest } from '../../utils/auth-api';
import { setCookie } from '../../utils/utils';

const initialState = { user: null };
export const registerUser = createAsyncThunk('auth/register', async (userdata) => {
  try {
    return registerUserRequest(userdata);
  } catch (e) {
    console.log(e);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (userdata) => {
  try {
    return loginRequest(userdata);
  } catch (e) {
    console.log(e);
  }
});

export const logout = createAsyncThunk('auth/logout', async (token) => {
  try {
    return logoutRequest(token);
  } catch (e) {
    console.log(e);
  }
});
const setCredentials = (state, user, accessToken, refreshToken) => {
  state.user = user;
  const token = accessToken.split('Bearer ')[1];
  setCookie('token', token, { expires: 20 * 60 });
  setCookie('refreshToken', refreshToken);
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        registerUser.fulfilled,
        (state, { payload: { success, user, accessToken, refreshToken, message } }) => {
          if (success) {
            setCredentials(state, user, accessToken, refreshToken);
          } else {
            alert(message);
          }
        }
      )
      .addCase(
        loginUser.fulfilled,
        (state, { payload: { success, user, accessToken, refreshToken, message } }) => {
          if (success) {
            setCredentials(state, user, accessToken, refreshToken);
          } else {
            alert(message);
          }
        }
      )
      .addCase(logout.fulfilled, (state, { payload: { message, success } }) => {
        if (success) {
          state = initialState;
        }
        alert(message);
      });
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
