import { Html, Head, Main, NextScript } from 'next/document'
import { ToastContainer } from 'react-nextjs-toast';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ToastContainer/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
