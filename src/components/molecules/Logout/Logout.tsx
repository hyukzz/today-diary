import { useNavigate } from 'react-router-dom';

import { auth } from '@/firebase/config';

const Logout = () => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <>
      <button onClick={onLogoutClick}>로그아웃</button>
    </>
  );
};

export default Logout;
