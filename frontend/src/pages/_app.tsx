import 'bootstrap/dist/css/bootstrap.min.css';
import './global-styles.css';
import { AuthProvider } from '../contexts/auth.context';
import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import styles from '../styles/navbar.module.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const navbuttonClass = (buttonRef) => `${router.pathname == buttonRef ? styles.activeButton : ""} ${styles.button}`
  return (
    <AuthProvider>
      <ul className={styles.container}>
        <li className={navbuttonClass("/")}>
          <Link href="/">home</Link>
        </li>
        <li className={navbuttonClass("/dashboard")}>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className={navbuttonClass("/jardins")}>
          <Link href="/jardins">Jardins</Link>
        </li>
        <li className={navbuttonClass("/cadastro")}>
          <Link href="/cadastro">Cadastro</Link>
        </li>
        <li className={navbuttonClass("/login")}>
          <Link href="/login">Login</Link>
        </li>
      </ul>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
