import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHorseHead } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='w-full fixed top-0 flex py-3 px-4 items-center justify-between bg-[#292929]'>
      <Link href='/'>
        <FontAwesomeIcon icon={faHorseHead} className='text-primary text-3xl' />
      </Link>
      <Link
        href='/bell-cow-rendezvous/overview'
        className='text-white bg-secondary rounded-md shadow-sm py-3 px-6 hover:bg-secondary/90'>
        Start New Ride
      </Link>
    </div>
  );
};

export default Header;
