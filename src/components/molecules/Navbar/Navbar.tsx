import { useNavigate, useLocation } from 'react-router-dom';

import Logout from '@/components/molecules/Logout/Logout';
import { useAuthContext } from '../Context/Context';
import apple_logo from '@/assets/Logo/apple_logo.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuthContext();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2">
          <img
            src={apple_logo}
            alt="로고"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 select-none"
          />

          <h1 className="text-md sm:text-xl md:text-2xl lg:text-2xl font-bold text-white select-none">
            오늘의 일기
          </h1>
        </div>
        {isLoggedIn && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/diarywrite')}
              disabled={location.pathname === '/diarywrite'}
              className={`select-none text-sm sm:text-md md:text-lg lg:text-lg font-medium focus:outline-none ${
                location.pathname === '/diarywrite' ? 'text-black' : 'text-white'
              }`}
            >
              일기쓰기
            </button>
            <button
              onClick={() => navigate('/diary')}
              disabled={location.pathname === '/diary'}
              className={`select-none text-sm sm:text-md md:text-lg lg:text-lg font-medium focus:outline-none mx-3 ${
                location.pathname === '/diary' ? 'text-black' : 'text-white'
              }`}
            >
              일기
            </button>
          </div>
        )}
        <div className="flex items-center gap-4">
          {isLoggedIn && <Logout />}
          {!isLoggedIn && (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-lg font-medium text-white focus:outline-none select-none"
              >
                로그인
              </button>
              <a
                href="https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp"
                className="text-blue-500 font-semibold select-none"
                rel="noopener noreferrer"
                target="_blank"
              >
                회원 가입
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
