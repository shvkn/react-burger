import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserRequest,
  loginRequest,
  logoutRequest,
  patchUserRequest,
  refreshTokenRequest,
  registerUserRequest,
} from '../../utils/auth-api';
import { getCookie, setCookie } from '../../utils/utils';
import { Tokens } from '../../utils/constants';

const initialState = { user: null };
export const registerUser = createAsyncThunk('auth/register', async (userdata) => {
  try {
    return registerUserRequest(userdata);
  } catch (e) {
    console.log(e);
  }
});

export const login = createAsyncThunk('auth/login', async (userdata) => {
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

export const getUser = createAsyncThunk('auth/user', async () => {
  try {
    const accessToken = getCookie(Tokens.ACCESS_TOKEN);
    return getUserRequest(accessToken).then(({ success, user }) => {
      if (success) {
        return user;
      }
      const refreshToken = getCookie(Tokens.REFRESH_TOKEN);
      return refreshTokenRequest(refreshToken).then(
        ({ success, accessToken: newAccessToken, refreshToken: newRefreshToken }) => {
          if (success) {
            setCredentials(newAccessToken, newRefreshToken);
            return getUserRequest(newAccessToken).then(({ success, user }) => {
              if (success) {
                return user;
              }
            });
          }
        }
      );
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const patchUser = createAsyncThunk('auth/user', async (userdata) => {
  try {
    const accessToken = getCookie(Tokens.ACCESS_TOKEN);
    return patchUserRequest(userdata, accessToken).then(({ success, user }) => {
      if (success) {
        return user;
      }
      const refreshToken = getCookie(Tokens.REFRESH_TOKEN);
      return refreshTokenRequest(refreshToken).then(
        ({ success, accessToken: newAccessToken, refreshToken: newRefreshToken }) => {
          if (success) {
            setCredentials(newAccessToken, newRefreshToken);
            return patchUserRequest(userdata, newAccessToken).then(({ success, user }) => {
              if (success) {
                return user;
              }
            });
          }
        }
      );
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
});

const setCredentials = (accessToken, refreshToken) => {
  setCookie(Tokens.ACCESS_TOKEN, accessToken, { expires: 20 * 60 });
  setCookie(Tokens.REFRESH_TOKEN, refreshToken);
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
            state.user = user;
            setCredentials(accessToken, refreshToken);
          } else {
            alert(message);
          }
        }
      )
      .addCase(
        login.fulfilled,
        (state, { payload: { success, user, accessToken, refreshToken, message } }) => {
          if (success) {
            state.user = user;
            setCredentials(accessToken, refreshToken);
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
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      });
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
