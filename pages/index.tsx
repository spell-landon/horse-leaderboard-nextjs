import Image from 'next/image';
import { SignUpForm } from '../components/SignUpForm';

export default function Home() {
  return (
    <div className='relative flex justify-center items-center h-[calc(100vh-72px)] w-screen'>
      {/* Background Image */}
      <Image
        src='https://images.unsplash.com/photo-1466495227171-d05d7e3ac2b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2458&q=80'
        alt='Horse riders in the trees with rays of light shining through'
        width={2458}
        height={1843}
        loading={'lazy'}
        className='-z-[2] h-full w-full object-cover absolute'
      />
      {/* Overlay */}
      <div className='-z-[1] h-full w-full bg-gradient-to-b from-black via-black to-transparent absolute'></div>

      {/* Content */}
      <div className='flex flex-col justify-center items-center gap-16'>
        <div className='flex justify-center items-center flex-col gap-2'>
          <h1 className='text-white font-bold text-3xl sm:text-5xl'>
            Welcome to HorseRide
          </h1>
          <h2 className='font-extralight text-md sm:text-lg text-gray-400'>
            Keep track of events, riders, and horses
          </h2>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
}
