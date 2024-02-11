import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { usersService } from '@app/services/usersService';

import { localStorageKeys } from '../config/localStorageKeys';

interface IAuthContextValue {
  signedIn: boolean;
  // user: User | undefined;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!storedAccessToken;
  });

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    queryClient.removeQueries();

    setSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signout();
    }
  }, [isError, signout]);

  const value = useMemo(
    () => ({
      signedIn: isSuccess && signedIn,
      user: data,
      signin,
      signout,
    }),
    [isSuccess, signedIn, data, signin, signout],
  );

  return (
    <AuthContext.Provider value={value}>
      {/* <LaunchScreen isLoading={isFetching} /> */}

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
