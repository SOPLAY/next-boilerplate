import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../core/components/Navbar';
import { SessionProvider } from 'next-auth/react';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
