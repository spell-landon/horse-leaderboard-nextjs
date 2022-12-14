import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHorseHead } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Button } from '../elements/Button';

const Header = () => {
  return (
    <div className='w-full fixed top-0 flex py-3 px-4 items-center justify-between bg-[#292929]'>
      <Link href='/'>
        <FontAwesomeIcon icon={faHorseHead} className='text-primary text-3xl' />
      </Link>
      <Button to='/bell-cow-rendezvous/overview' primary color={'secondary'}>
        Start New Ride
      </Button>
    </div>
  );
};

export default Header;
