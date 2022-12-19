import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../components/elements/Button';
import { Layout } from '../components/global/Layout';

const PageNotFound = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] w-full flex justify-center items-center px-4 lg:px-0'>
        <div className='flex flex-col justify-center items-center gap-8'>
          <div className='flex gap-4 sm:gap-6 md:gap-8 justify-center items-center'>
            <h2 className='font-medium text-lg sm:text-xl md:text-4xl text-black'>
              404
            </h2>
            <div className='h-10 w-[1px] bg-black'></div>
            <p className='font-extralight text-lg sm:text-xl md:text-4xl text-black'>
              Uh oh, looks like there&apos;s been a problem!
            </p>
          </div>
          <div className='flex justify-center items-center gap-4'>
            <Button primary color='secondary' onClick={() => router.back()}>
              Take me back!
            </Button>
            <Button secondary color='secondary' to='/'>
              Take me home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
