import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../elements/Input';
import { InputLabel } from '../elements/InputLabel';
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';

// MUI Icons
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '../elements/Button';
import { classNames } from '../../lib/stylingFunctions';

export const SignUpForm = () => {
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const initialState = {
    email: '',
    phone: '',
  };
  const router = useRouter();
  const [useMethod, setUseMethod] = useState('email');
  const [state, setState] = useState(initialState);
  const [inputActive, setInputActive] = useState(false);

  function formatPhoneNumber(phoneNumberString: string) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  // Handle the input field value
  const handleChange = (e: any) => {
    if (useMethod === 'email') {
      setState({ ...state, [e.target.id]: e.target.value });
    } else {
      setState({
        ...state,
        [e.target.id]: formatPhoneNumber(e.target.value),
      });
    }
  };

  // Change the inputActive state if the input value is empty
  useEffect(() => {
    if (
      (useMethod === 'email' && !state.email) ||
      (useMethod === 'phone' && !state.phone)
    ) {
      setInputActive(false);
    } else {
      setInputActive(true);
    }
  }, [state]);

  // Handle logging in
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = new FormData(event.target).get('email');
    const phone = new FormData(event.target).get('phone');

    const stripPhone =
      '+1' +
      phone
        ?.replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll('-', '')
        .replaceAll(' ', '');

    // the Magic code
    let did;
    if (useMethod === 'email') {
      did = await new Magic(
        process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
      ).auth.loginWithMagicLink({ email });
    }
    if (useMethod === 'phone') {
      did = await new Magic(
        process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
      ).auth.loginWithSMS({
        phone: stripPhone,
      });
    }

    try {
      await fetch('/api/login', {
        method: 'POST',
        headers: { Authorization: `Bearer ${did}` },
      }).then(() => router.push('/account'));
    } catch (err) {
      console.log(err);
    }
  };

  // Handles switching between email and phone input
  const handleMethod = () => {
    if (useMethod === 'email') {
      setUseMethod('phone');
    } else {
      setUseMethod('email');
    }
    setState(initialState);
  };

  // Handle the input focus on method change
  // FIXME
  const handleFocus = () => {
    if (useMethod === 'email') {
      emailRef?.current?.focus();
    } else {
      phoneRef?.current?.focus();
    }
  };

  return (
    <div className='bg-white rounded-3xl shadow-sm p-16 flex flex-col gap-4 w-screen max-w-md'>
      <form
        className='space-y-8 flex flex-col justify-center items-center'
        onSubmit={handleSubmit}>
        <div className='w-full flex flex-col justify-between items-center gap-2'>
          <h3 className='font-medium text-5xl text-black'>Welcome</h3>
          <h4 className='font-light text-black/70 text-center text-sm'>
            Keep track of events, riders, and horses
          </h4>
        </div>
        <div className='w-full'>
          {useMethod === 'email' ? (
            <Input
              ref={emailRef}
              id={'email'}
              name={'email'}
              type={'email'}
              value={state.email}
              onChange={handleChange}
              placeholder='Email'
              autoComplete='off'
            />
          ) : (
            <Input
              ref={phoneRef}
              id={'phone'}
              name={'phone'}
              type='string'
              value={state.phone}
              onChange={handleChange}
              placeholder='Phone'
              autoComplete='off'
            />
          )}
        </div>

        <div className='w-full'>
          <button
            className={classNames(
              `text-white font-normal w-full rounded-full py-3 text-lg transition-all`,
              inputActive ? 'bg-primary hover:bg-primary/90' : 'bg-primary/50'
            )}
            disabled={!inputActive}>
            Log in / Sign up
          </button>
        </div>
      </form>

      {/* <div className='mt-4'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-white px-2 text-gray-500'>OR</span>
          </div>
        </div>

        <div className='w-full mt-6'>
          <button
            onClick={() => {
              handleMethod();
              handleFocus();
            }}
            className={classNames(
              `text-black font-normal w-full rounded-full py-3 text-lg transition-all border border-black bg-white hover:bg-black/5`
            )}>
            {useMethod === 'email' ? 'Use Phone' : 'Use Email'}
          </button>
        </div>
      </div> */}
    </div>
  );
};
