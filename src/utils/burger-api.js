import { NORMA_API } from './constants';

/*export const getIngredients = async () => {
  const response = await fetch(`${NORMA_API}/ingredients`);
  if (!response.ok) {
    throw new Error(`Error while fetching 'Ingredients' from API ${response.status}`);
  }
  const { data } = await response.json();
  return data;
};*/

export const getIngredients = async () => {
  return fetch(`${NORMA_API}/ingredients`).then((response) => {
    if (!response.ok) {
      throw new Error(`Error while fetching 'Ingredients' from API ${response.status}`);
    }
    return response.json();
  });
};
