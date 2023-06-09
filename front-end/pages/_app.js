import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import Header from './components/Header';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
