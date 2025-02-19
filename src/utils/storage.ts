export enum StorageKeys {
  Picture = 'picture',
}

export const setLocalStorage = (
  key: StorageKeys,
  value: string | number | object | Array<any>,
): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: StorageKeys): string | undefined => {
  const storageValue = localStorage?.getItem(key);
  if (storageValue === null) {
    return undefined;
  }
  return JSON.parse(storageValue);
};

export const removeLocalStorage = (key: StorageKeys): void => {
  localStorage.removeItem(key);
};
