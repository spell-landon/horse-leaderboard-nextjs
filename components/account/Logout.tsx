import { Magic } from 'magic-sdk';
import CookieService from '../../lib/cookie';
import { useRouter } from 'next/router';
import { Button } from '../elements/Button';

export default function Logout({ user }: any) {
  // FIXME Not finished
  const router = useRouter();
  const logoutUser = async () => {
    const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY);

    try {
      await m.user.logout().then(() => router.push('/'));
    } catch {
      (err) => console.error(err);
    }
  };
  return (
    <div className='flex justify-end items-center'>
      <Button primary color='primary' onClick={logoutUser}>
        Logout
      </Button>
    </div>
  );
}
