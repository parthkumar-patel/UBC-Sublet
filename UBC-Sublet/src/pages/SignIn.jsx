import { useEffect } from 'react';
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const { user, googleSignIn } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/account');
    }
  }, [user]);

  return (
    <div>
      <h1 className='text-center display-4 font-weight-bold py-5'>Sign in</h1>
      <div className='max-w-240px mx-auto py-4'>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
}