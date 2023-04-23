import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/firebase/config';
import { notification } from '@/components/atoms/Toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        navigate('/login');
      })
      .catch(() => {
        notification('error', '회원가입을 다시 시도해주세요.');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="mx-4 bg-white w-full max-w-md rounded-lg overflow-hidden shadow-md sm:w-5/6 md:w-3/4 lg:w-2/3">
        <div className="py-8 px-10">
          <h2 className="text-3xl font-bold mb-2 text-center select-none">회원 가입</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2 select-none">
                이메일
                <input
                  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2 select-none">
                비밀번호
                <input
                  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="flex items-center justify-center mt-6">
              <button
                className="block w-full px-4 py-2 text-lg border font-semibold text-black border-gray-300 bg-white rounded-md hover:bg-gray-50 select-none"
                type="submit"
              >
                <span>회원 가입</span>
              </button>
            </div>
          </form>
        </div>
        <div className="bg-gray-100 py-4 px-10 border-t border-gray-200">
          <p className="text-sm text-gray-500 select-none">
            이미 회원이신가요?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
