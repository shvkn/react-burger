import { NORMA_API } from './constants';

export const getIngredients = () => {
  return fetch(`${NORMA_API}/ingredients`).then((response) => {
    if (!response.ok) {
      throw new Error(`Error while fetching 'Ingredients' from API ${response.status}`);
    }
    return response.json();
  });
};

export const postOrder = (ingredients) => {
  return fetch(`${NORMA_API}/orders`, {
    method: 'POST',
    headers: {
      authorization: 'a9c10068-1239-4b61-97d8-9278a4fcdf82',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Error while fetching 'Ingredients' from API ${response.status}`);
    }
    return response.json();
  });
};
