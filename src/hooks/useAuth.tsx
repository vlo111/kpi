import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { Navigate } from 'react-router-dom';

import { useLocalStorage } from './useLocalStorage';

// // @ts-expect-error
const AuthContext: any = createContext({});

export const AuthProvider: any = ({ children }: any) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);

  const login: any = useCallback(
    (data: any) => {
      setUser(data);
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    <Navigate to="/" replace />;
  }, [setUser]);

  const isToken: any = useCallback(
    (data: any) => {
      setToken(data);
    },
    [setToken]
  );

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isToken
    }),
    [login, logout, user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): any => {
  return useContext(AuthContext);
};
