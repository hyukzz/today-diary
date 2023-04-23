import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRedirectResult } from 'firebase/auth';

import { auth } from '@/firebase/config';
import { notification } from '@/components/atoms/Toast';
import Loading from '@/components/atoms/Loading/Loading';
import { useAuthContext } from '@/components/molecules/Context/Context';

const Redirect = () => {
  const navigate = useNavigate();
  const { saveAuthData } = useAuthContext();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (result && result.user) {
          const accessToken = await result.user.getIdToken();
          const uid = result.user.uid;

          saveAuthData(accessToken, uid);
          navigate('/');
          notification('success', '오늘의 일기를 기록해보세요!');
        }
      } catch (error) {
        console.error('redirect error: ', error);
      }
    };

    handleRedirectResult();
  }, []);

  return (
    <div>
      <Loading />
    </div>
  );
};

export default Redirect;
