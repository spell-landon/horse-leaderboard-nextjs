import Image from 'next/image';
import { SignUpForm } from '../components/account/SignUpForm';
import { Layout } from '../components/global/Layout';
import Script from 'next/script';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // If logged in, reroute to /events
  if (user && !loading) router.push('/events');

  return (
    <Layout>
      <div className='flex justify-center items-center h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] w-screen'>
        {/* Background Image */}
        <Image
          src='https://images.unsplash.com/photo-1466495227171-d05d7e3ac2b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2458&q=80'
          alt='Horse riders in the trees with rays of light shining through'
          width={2458}
          height={1843}
          loading={'lazy'}
          className='-z-[2] h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] w-full object-cover absolute'
        />
        {/* Overlay */}
        <div className='-z-[1] h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] w-full bg-gradient-to-b from-black via-black to-transparent absolute'></div>
        {/* Content */}
        <div className='flex flex-col justify-center items-center gap-16'>
          <SignUpForm />
          {/* <Script
            src='https://auth.magic.link/pnp/login'
            data-magic-publishable-api-key={
              process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
            }
          /> */}
        </div>
      </div>
    </Layout>
  );
}
