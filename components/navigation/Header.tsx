import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHorseHead } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Button } from '../elements/Button';
import { useRouter } from 'next/router';
import { classNames } from '../../lib/stylingFunctions';

const Header = () => {
  const router = useRouter();
  const { pathname } = router;

  const [selected, setSelected] = useState<string | undefined>('');
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
            <button
              onClick={() => setSelected('overview')}
              className={classNames(
                'rounded-md shadow-md py-3 px-3 md:px-6 hover:bg-[#303030] text-white text-xs md:text-base',
                selected === 'overview' ? 'bg-[#121212]' : 'bg-[#292929]'
              )}>
              Overview
            </button>
            <button
              onClick={() => setSelected('contestants')}
              className={classNames(
                'rounded-md shadow-md py-3 px-3 md:px-6 hover:bg-[#303030] text-white text-xs md:text-base',
                selected === 'contestants' ? 'bg-[#121212]' : 'bg-[#292929]'
              )}>
              Contestants
            </button>
          </div>
        )}
      </div>
      <Button to='/bell-cow-rendezvous/overview' primary color={'secondary'}>
        Start New Ride
      </Button>
    </div>
  );
};

export default Header;
