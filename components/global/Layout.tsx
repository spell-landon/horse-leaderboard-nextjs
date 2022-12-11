import React from 'react';
import Head from 'next/head';
import Header from '../navigation/Header';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

export const Layout = ({ children }: { children: any | JSX.Element }) => {
  return (
    <div>
      <Head>
        <title>Horse Competition</title>
        <meta
          name='description'
          content='SEO Content about the Horse Competition'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main className='mt-[72px]'>{children}</main>

      {/* <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
};
