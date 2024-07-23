
export const isClient = () => typeof window !== 'undefined';

export const getLocalStorageItem = (key:string) => {
  if (!isClient()) return null;
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key:string, value:string) => {
  if (!isClient()) return null;
  return localStorage.setItem(key, value);
};

export const removeLocalStorageItem = (key:string) => {
  if (!isClient()) return null;
  return localStorage.removeItem(key);
};
