import { NORMA_API } from './constants';

const processResponse = (res) => {
  if (res.ok) return res.json();
  throw new Error(`Ошибка: ${res.status}`);
};

export const getIngredients = () => {
  return fetch(`${NORMA_API}/ingredients`).then(processResponse);
};

export const postOrder = (ingredients) => {
  return fetch(`${NORMA_API}/orders`, {
    method: 'POST',
    headers: {
      authorization: 'a9c10068-1239-4b61-97d8-9278a4fcdf82',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  }).then(processResponse);
};
