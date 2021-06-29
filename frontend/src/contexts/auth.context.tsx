import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { User } from '../domain';
import { login as loginApi, getUser } from "../services/api/auth.api";
import { CookieNames } from "../constants/names.enum";

type LoginData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  login: (data: LoginData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User>(undefined);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { [CookieNames.USER_ID]: userId } = parseCookies();

    if (userId) getUser({userId}).then(usr => setUser(usr.data));
  }, []);

  async function login({ email, password }: LoginData) {
    const { accessToken, refreshToken, user } = (await loginApi({
      email,
      password,
    })).data;

    setCookie(undefined, CookieNames.ACCESS_TOKEN, accessToken, {
      maxAge: 60 * 60 * 1, // 1 hour
    });
    setCookie(undefined, CookieNames.REFRESH_TOKEN, refreshToken, {
      maxAge: 60 * 60 * 1, // 1 hour
    });
    setCookie(undefined, CookieNames.USER_ID, user.id, {
      maxAge: 60 * 60 * 1, // 1 hour
    });
    // api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user)

    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  )
}