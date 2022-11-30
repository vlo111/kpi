import { clearLocalStorage } from '../hooks/useLocalStorage';

/** Logout the user */
export const logOut = (): void => {
  clearLocalStorage();
  window.location.reload();
};

export const noop = (): void => { };

export const handleErrorMessage = (response: any): string => {
  return response?.data?.message;
};
