import { useNavigate } from 'react-router-dom';

import { auth } from '@/firebase/config';

const Logout = () => {
  const navigate = useNavigate();

  const onLogout = async () => {
    await auth.signOut();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('uid');

    navigate('/login');
  };

  return (
    <>
      <button onClick={onLogout}>로그아웃</button>
    </>
  );
};

export default Logout;
