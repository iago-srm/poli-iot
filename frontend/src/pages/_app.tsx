import 'bootstrap/dist/css/bootstrap.min.css';
import './global-styles.css';
import { AuthProvider } from '../contexts/auth.context';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
