import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth, provider } from '@/firebase/config';
import google_logo from '@/assets/Logo/google_logo.svg';

const Auth = () => {
  const navigate = useNavigate();

  const onGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const accessToken = await user.getIdToken();

        localStorage.setItem('uid', user.uid);
        localStorage.setItem('accessToken', accessToken);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      navigate('/');
    }
  });

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
        onClick={onGoogleLogin}
        name="google"
      >
        <img src={google_logo} alt="Google Logo" className="w-6 h-6" />
        <span>구글 로그인</span>
      </button>
    </>
  );
};

export default Auth;
