import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';

import { useAuthContext } from '@/components/molecules/Context/Context';
import { auth, provider } from '@/firebase/config';
import google_logo from '@/assets/Logo/google_logo.svg';
import { notification } from '@/components/atoms/Toast';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveAuthData, isLoggedIn } = useAuthContext();

  const onGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const user = res.user;

        const accessToken = await user.getIdToken();
        const uid = user.uid;

        saveAuthData(accessToken, uid);
        notification('success', '오늘의 일기를 기록해보세요!');

        navigate('/');
      })
      .catch(() => {
        notification('error', '로그인을 다시 시도해주세요.');
      });
  };

  useEffect(() => {
    if (isLoggedIn && location.pathname === '/login') {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="mx-4 bg-white w-full max-w-md rounded-lg overflow-hidden shadow-md sm:w-5/6 md:w-3/4 lg:w-2/3">
        <div className="py-8 px-10">
          <h2 className="text-3xl font-bold mb-2 text-center select-none">로그인</h2>
          <p className="text-gray-600 mb-6 text-center select-none">구글 계정으로 로그인하세요.</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 w-full"
            onClick={onGoogleLogin}
            name="google"
          >
            <img src={google_logo} alt="Google Logo" className="w-6 h-6 select-none" />
            <span className="flex-1 text-center select-none">구글 로그인</span>
          </button>
        </div>
        <div className="bg-gray-100 py-4 px-10 border-t border-gray-200">
          <p className="text-sm text-gray-500 select-none ">
            아직 회원이 아니신가요?{' '}
            <a
              href="https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp"
              className="text-blue-500 font-semibold"
              rel="noopener noreferrer"
              target="_blank"
            >
              회원 가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
