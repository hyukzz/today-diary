import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

import { useAuthContext } from '@/components/molecules/Context/Context';
import { auth, provider } from '@/firebase/config';
import google_logo from '@/assets/Logo/google_logo.svg';
import { notification } from '@/components/atoms/Toast';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveAuthData, isLoggedIn } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
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
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 select-none">로그인</h2>
          <form onSubmit={handleLogin} className="mb-6">
            <label className="block mb-2 font-semibold text-gray-800 select-none">
              이메일
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block mb-2 font-semibold text-gray-800 select-none">
              비밀번호
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm mt-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </label>
            <button
              type="submit"
              className="block w-full px-4 py-2 text-lg border font-semibold text-black border-gray-300 bg-white rounded-md hover:bg-gray-50 select-none"
            >
              로그인
            </button>
          </form>
          <p className="text-gray-600 mb-6 text-center select-none">구글 계정으로 로그인하세요.</p>
          <button
            className="bg-blue-500  text-white hover:bg-blue-600 font-bold py-2 px-4 rounded flex items-center gap-2 w-full focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none focus:ring-2"
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
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-500 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              회원 가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
