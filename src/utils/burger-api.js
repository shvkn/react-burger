import { NORMA_API } from './constants';

const processResponse = (res) => {
  if (res.ok) return res.json();
  throw new Error(`Ошибка: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(processResponse);
};

export const getIngredients = () => {
  return request(`${NORMA_API}/ingredients`);
};

export const postOrder = (ingredients) => {
  const options = {
    method: 'POST',
    headers: {
      authorization: 'a9c10068-1239-4b61-97d8-9278a4fcdf82',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  };
  return request(`${NORMA_API}/orders`, options);
};
