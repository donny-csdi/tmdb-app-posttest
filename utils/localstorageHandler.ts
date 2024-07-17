import { LocalStorageKey } from "./enum";

export const getLocalStorage = <T>(key: LocalStorageKey | string): T | null => {
  if (typeof window !== "undefined") {
    const dataInLocalstorage = window.localStorage.getItem(key);
    try {
      return !!dataInLocalstorage && dataInLocalstorage !== "undefined"
        ? JSON.parse(dataInLocalstorage)
        : null;
    } catch {
      return dataInLocalstorage as unknown as T;
    }
  } else return null;
};

export const saveLocalStorage = (key: LocalStorageKey, data: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, data);
  }
};
