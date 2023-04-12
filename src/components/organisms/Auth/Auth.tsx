import { useState } from 'react';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

import { auth, provider } from '@/firebase/config';
import google_logo from '@/assets/Logo/google_logo.svg';

const Auth = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const onSocialClick = async () => {
    await signInWithPopup(auth, provider);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
        onClick={onSocialClick}
        name="google"
      >
        <img src={google_logo} alt="Google Logo" className="w-6 h-6" />
        <span>구글 로그인</span>
      </button>
    </>
  );
};

export default Auth;
