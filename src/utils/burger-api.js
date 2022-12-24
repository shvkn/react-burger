import { NORMA_API } from './constants';

const processResponse = (res) => {
  if (res.ok) return res.json();
  throw new Error(`Ошибка: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(processResponse);
};

export const getIngredientsRequest = () => {
  return request(`${NORMA_API}/ingredients`);
};

export const postOrderRequest = (ingredients, token) => {
  const options = {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  };
  return request(`${NORMA_API}/orders`, options);
};

export const getResetCodeRequest = (form) => {
  return request(`${NORMA_API}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export const resetPasswordRequest = (form) => {
  return request(`${NORMA_API}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};
