import { Layout } from '../../components/global/Layout';
import useAuth from '../../hooks/useAuth';
import Logout from '../../components/account/Logout';
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';
import { useEffect } from 'react';

const Profile = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (!loading && !user) router.push('/');
  // Once the user request finishes, show the user

  return (
    <Layout>
      <div className='w-full max-w-5xl mx-auto flex flex-col justify-between items-start px-4 lg:px-0 py-8 gap-8'>
        <h1 className='font-medium text-3xl text-black'>Account Page</h1>

        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        <div className='w-full flex flex-col'>
          <p className='text-lg text-black/70 font-normal'>Email</p>
          <p className='text-base text-black font-light'>{user?.email}</p>
        </div>

        <Logout user={user} />
      </div>
    </Layout>
  );
};

export default Profile;
