import React from 'react';
import Link from 'next/link';

const second = () => {
  return (
    <div>
      <p>I'm the second page!</p>
      <Link href='/'>Go back home</Link>
    </div>
  );
};

export default second;
