import { clearLocalStorage } from '../hooks/useLocalStorage';

/** Logout the user */
export const logOut = () => {
  clearLocalStorage();
  window.location.reload();
};

export const noop = () => { };
