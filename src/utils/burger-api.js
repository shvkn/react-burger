import { NORMA_API } from './constants';

export const getIngredients = () => {
  return fetch(`${NORMA_API}/ingredients`).then((response) => {
    if (!response.ok) {
      throw new Error(`Error while fetching 'Ingredients' from API ${response.status}`);
    }
    return response.json();
  });
};
