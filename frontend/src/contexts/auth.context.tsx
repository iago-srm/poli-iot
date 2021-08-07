import React from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { User } from '../domain';
import { CookieNames } from "../constants/names.enum";
import { useApiCall } from '../services';
import { login as loginApi, getUser, ApiError } from '../services';

type LoginData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  login: (data: LoginData) => Promise<void>;
  errors: ApiError;
  loading: boolean;
  response: any
}

export const AuthContext = React.createContext({} as AuthContextType)

export function AuthProvider({ children }) {

  const [user, setUser] = React.useState<User>(undefined);
  const { apiCall, errors, response, loading } = useApiCall<LoginData, 
  { refreshToken: string; accessToken: string; user: any }>
  (loginApi);

  const isAuthenticated = !!user;

  React.useEffect(() => {
    const { [CookieNames.USER_ID]: userId } = parseCookies();

    if (userId) getUser({ userId }).then(usr => setUser(usr.data));
  }, []);

  React.useEffect(() => {
    if(response) {
      const { accessToken, refreshToken, user } = response.data;

      setCookie(undefined, CookieNames.ACCESS_TOKEN, accessToken, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      setCookie(undefined, CookieNames.REFRESH_TOKEN, refreshToken, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      setCookie(undefined, CookieNames.USER_ID, user.id, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      // api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser(user)

      Router.push('/dashboard');
    }
  }, [response]);
  
  const login = React.useCallback(async ({ email, password }: LoginData) => {
    await apiCall({ email, password });
  }, [apiCall]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, errors, loading, response }}>
      {children}
    </AuthContext.Provider>
  )
}