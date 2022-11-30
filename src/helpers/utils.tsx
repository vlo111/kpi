import { clearLocalStorage } from '../hooks/useLocalStorage';
import { TVoid } from '../types/global';

/** Logout the user */
export const logOut: TVoid = () => {
  clearLocalStorage();
  window.location.reload();
};

export const noop: TVoid = () => { };

export const handleErrorMessage = (response: any): string => {
  return response?.data?.message;
};
