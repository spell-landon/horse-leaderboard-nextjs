import React from 'react';
import Link from 'next/link';
import { Layout } from '../components/global/Layout';

const second = () => {
  return (
    <Layout>
      <div>
        <p>I&apos;m the second page!</p>
        <Link href='/'>Go back home</Link>
      </div>
    </Layout>
  );
};

export default second;
