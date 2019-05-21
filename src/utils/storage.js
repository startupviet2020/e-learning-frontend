import { LOCAL_STORAGE_PREFIX } from '../consts/common';

export const getItem = key => localStorage.getItem(`${LOCAL_STORAGE_PREFIX}.${key}`);

export const setItem = (key, value) => localStorage.setItem(`${LOCAL_STORAGE_PREFIX}.${key}`, value);

export const removeItem = key => localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}.${key}`);

export const getJson = (key) => {
  const value = getItem(key);
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const setJson = (key, value) => setItem(key, JSON.stringify(value));
