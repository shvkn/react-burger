import { Tokens } from './constants';
import { refreshTokenRequest } from './auth-api';

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const getRefreshToken = () => {
  return getCookie(Tokens.REFRESH_TOKEN);
};

export const getAccessToken = () => {
  return getCookie(Tokens.ACCESS_TOKEN);
};

export const setCredentials = (accessToken, refreshToken) => {
  setCookie(Tokens.ACCESS_TOKEN, accessToken, { expires: 20 * 60 });
  setCookie(Tokens.REFRESH_TOKEN, refreshToken);
};

export const getOrRefreshAccessToken = async (forceRefresh = false) => {
  const accessToken = getAccessToken();
  if (!accessToken || forceRefresh) {
    await refreshTokens();
    return getAccessToken();
  }
  return accessToken;
};

export const refreshTokens = async () => {
  try {
    const refreshToken = getRefreshToken();
    const {
      success,
      message,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    } = await refreshTokenRequest(refreshToken);
    if (success) {
      setCredentials(newAccessToken, newRefreshToken);
    } else {
      console.log(message);
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};
