import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserRequest,
  loginRequest,
  logoutRequest,
  patchUserRequest,
  registerUserRequest,
} from '../../utils/auth-api';
import { getOrRefreshAccessToken, getRefreshToken } from '../../utils/utils';

export const login = createAsyncThunk('auth/login', async (userdata) => {
  try {
    return await loginRequest(userdata);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userdata) => {
  try {
    return registerUserRequest(userdata);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const refreshToken = getRefreshToken();
    return logoutRequest(refreshToken);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const getUser = createAsyncThunk('auth/get-user', async () => {
  try {
    const accessToken = await getOrRefreshAccessToken();
    if (!accessToken) {
      return { success: false, message: 'Token missed' };
    }
    const response = await getUserRequest(accessToken);
    if (response.success) {
      return response;
    }
    const newAccessToken = await getOrRefreshAccessToken(true);
    return getUserRequest(newAccessToken);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const patchUser = createAsyncThunk('auth/patch-user', async (userdata) => {
  try {
    const accessToken = await getOrRefreshAccessToken();
    if (!accessToken) {
      return { success: false, message: 'Token missed' };
    }
    const response = await patchUserRequest(userdata, accessToken);
    if (response.success) {
      return response;
    }
    const newAccessToken = await getOrRefreshAccessToken(true);
    return patchUserRequest(userdata, newAccessToken);
  } catch (e) {
    console.log(e);
    throw e;
  }
});
