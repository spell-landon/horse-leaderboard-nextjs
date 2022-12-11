import React from 'react';
import { Input } from './elements/Input';
import { InputLabel } from './elements/InputLabel';

// MUI Icons
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';

export const SignUpForm = () => {
  return (
    <div className='bg-white rounded-lg shadow-sm p-6 flex flex-col gap-4 w-full max-w-md'>
      <form className='space-y-6' action='#' method='POST'>
        <div>
          <InputLabel htmlFor='email'>Email Address</InputLabel>
          <div className='mt-1'>
            <Input
              id={'email'}
              name={'email'}
              type={'email'}
              autoComplete='email'
              required
            />
          </div>
        </div>

        <div>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <div className='mt-1'>
            <Input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
            />
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='text-sm'>
            <a
              href='#'
              className='font-normal text-gray-700/80 hover:text-gray-700'>
              Don&apos;t have an account?
            </a>
          </div>

          <div className='text-sm'>
            <a
              href='#'
              className='font-normal text-primary/80 hover:text-primary '>
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type='submit'
            className='flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
            Sign in
          </button>
        </div>
      </form>

      <div className='mt-4'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-white px-2 text-gray-500'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='mt-6 grid grid-cols-3 gap-3'>
          <div>
            <a
              href='#'
              className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'>
              <span className='sr-only'>Sign in with Facebook</span>
              <FacebookRoundedIcon />
            </a>
          </div>

          <div>
            <a
              href='#'
              className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'>
              <span className='sr-only'>Sign in with Twitter</span>
              <AppleIcon />
            </a>
          </div>

          <div>
            <a
              href='#'
              className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'>
              <span className='sr-only'>Sign in with GitHub</span>
              <GoogleIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
