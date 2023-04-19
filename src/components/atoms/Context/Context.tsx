import { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { ChildrenProps } from '@/@types/types.d';

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextValue {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  uid: string | null;
  setUid: (uid: string | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  saveAuthData: (accessToken: string, uid: string) => void;
  removeAuthData: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  accessToken: null,
  setAccessToken: () => {},
  uid: null,
  setUid: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  saveAuthData: () => {},
  removeAuthData: () => {},
});

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem('accessToken'),
  );
  const [uid, setUid] = useState<string | null>(() => localStorage.getItem('uid'));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => !!localStorage.getItem('accessToken'),
  );

  const saveAuthData = useCallback((accessToken: string, uid: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('uid', uid);
    setAccessToken(accessToken);
    setUid(uid);
    setIsLoggedIn(true);
  }, []);

  const removeAuthData = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('uid');
    setAccessToken(null);
    setUid(null);
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('uid');

    if (accessToken) {
      setAccessToken(accessToken);
      setUid(uid);
      setIsLoggedIn(true);
    }
  }, []);

  const authContextValue: AuthContextValue = {
    accessToken,
    setAccessToken,
    uid,
    setUid,
    isLoggedIn,
    setIsLoggedIn,
    saveAuthData,
    removeAuthData,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
