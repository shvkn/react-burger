import { NORMA_API } from './constants';
const postRequest = (url, data) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((e) => {
      console.log(e);
      throw e;
    });
};
export const registerUserRequest = (userdata) => {
  return postRequest(`${NORMA_API}/auth/register`, userdata);
};

export const loginRequest = (userdata) => {
  return postRequest(`${NORMA_API}/auth/login`, userdata);
};
