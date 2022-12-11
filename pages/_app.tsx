import '../styles/globals.css';
import type { AppProps } from 'next/app';
//Layout
import { Layout } from '../components/global/Layout';
// Font Awesome Icons
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
