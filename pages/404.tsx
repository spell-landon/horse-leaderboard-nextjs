import React from 'react';
import { Button } from '../components/elements/Button';
import { Layout } from '../components/global/Layout';

const PageNotFound = () => {
  return (
    <Layout>
      <div className='h-[calc(100vh-72px)] w-full flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center gap-8'>
          <div className='flex gap-8 justify-center items-center'>
            <h2 className='font-medium text-4xl text-white'>404</h2>
            <div className='h-10 w-[1px] bg-white'></div>
            <p className='font-extralight text-4xl text-white'>
              Uh oh, looks like there's been a problem!
            </p>
          </div>
          <Button primary color='primary' to='/'>
            Take me home
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
