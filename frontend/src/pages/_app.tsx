import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import './global-styles.css';
import { AuthProvider } from '../contexts/auth.context';
import { Navbar } from '../components';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar>
        <Navbar.NavButton path="/">
          Home
        </Navbar.NavButton>
        <Navbar.NavButton  path="/gardens">
          Gardens
        </Navbar.NavButton>
        <Navbar.NavButton  path="/dashboard">
          Dashboard
        </Navbar.NavButton>
        <Navbar.LoggedOut>
          <Navbar.NavButton  path="/register">
            Register
          </Navbar.NavButton>
          <Navbar.NavButton  path="/login">
            Login
          </Navbar.NavButton>
        </Navbar.LoggedOut>
        <Navbar.LoggedIn>
          <Navbar.NavButton  path="/logout">
            Logout
          </Navbar.NavButton>
        </Navbar.LoggedIn>
      </Navbar>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
