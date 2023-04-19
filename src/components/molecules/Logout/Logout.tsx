import { useNavigate } from 'react-router-dom';

import { auth } from '@/firebase/config';
import { useAuthContext } from '@/components/atoms/Context/Context';
import { notification } from '@/components/atoms/Toast';

const Logout = () => {
  const navigate = useNavigate();
  const { removeAuthData } = useAuthContext();

  const onLogout = async () => {
    await auth.signOut();

    removeAuthData();
    notification('success', '안녕히 가세요~');

    navigate('/login');
  };

  return (
    <>
      <button onClick={onLogout}>로그아웃</button>
    </>
  );
};

export default Logout;
