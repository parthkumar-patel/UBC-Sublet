import { UserAuth } from '../context/AuthContext';

export default function Account() {
  const { user } = UserAuth();

  return (
      <div className='w-[300px] m-auto'>
        <h1 className='text-center text-2xl font-bold pt-12'>Account</h1>
        <div>
          <p>Welcome, {user?.displayName}</p>
        </div>
      </div>
    );
}