import * as api from "./api";

export const register = (payload: object) => {
  let url = `auth/register`;
  return api.postResponse(url, payload);
};

export const login = (payload: object) => {
  let url = `auth/login`;
  return api.postResponse(url, payload);
};

export const getCalories = (payload: object) => {
  let url = `get-calories`;
  return api.postResponse(url, payload);
};
