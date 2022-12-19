import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHorseHead } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Button } from '../elements/Button';
import { useRouter } from 'next/router';
import { classNames } from '../../lib/stylingFunctions';
import { Magic } from 'magic-sdk';

const Header = ({ user, loading }: any) => {
  const router = useRouter();
  const { pathname } = router;

  const [selected, setSelected] = useState<string | undefined>('');
  if (loading) return null;

  return (
    <div className='w-full fixed top-0 flex py-3 px-4 items-center justify-between bg-[#292929]'>
      <div className='flex flex-row justify-start items-center gap-4 md:gap-12'>
        <Link href='/'>
          <FontAwesomeIcon
            icon={faHorseHead}
            className='text-primary text-3xl'
          />
        </Link>
        {pathname !== '/' && (
          <div className='flex justify-start items-center gap-4'>
            <Link
              href={`/events`}
              onClick={() => setSelected('events')}
              className={classNames(
                'rounded-md shadow-md py-3 px-3 md:px-6 hover:bg-[#303030] text-white text-xs md:text-base',
                selected === 'events' || pathname === '/events'
                  ? 'bg-[#121212]'
                  : 'bg-[#292929]'
              )}>
              All Events
            </Link>
            <Link
              href={`/contestants`}
              onClick={() => setSelected('contestants')}
              className={classNames(
                'rounded-md shadow-md py-3 px-3 md:px-6 hover:bg-[#303030] text-white text-xs md:text-base',
                selected === 'contestants' || pathname === '/contestants'
                  ? 'bg-[#121212]'
                  : 'bg-[#292929]'
              )}>
              Contestants
            </Link>
          </div>
        )}
      </div>
      <div className='flex justify-between items-center gap-2'>
        <Button to='/new_event' primary color='primary'>
          Start New Ride
        </Button>
        {!user && (
          <Link href='/account'>
            <div className='h-6 w-6 bg-blue-500 rounded-full'></div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
