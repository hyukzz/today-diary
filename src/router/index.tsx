import { Fragment, useEffect } from 'react';
import { createBrowserRouter, useNavigate } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';

import { ChildrenProps } from '@/@types/types.d';
import MainPage from '@/components/pages/MainPage';
import Navbar from '@/components/molecules/Navbar/Navbar';
import Auth from '@/components/organisms/Auth/Auth';
import NotFound from '@/components/pages/NotFound';
import { useAuthContext } from '../components/molecules/Context/Context';

interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
  private: boolean;
}

const routerData: RouterElement[] = [
  {
    id: 1,
    path: '/',
    label: 'Home',
    element: (
      <div className="relative min-h-screen">
        <MainPage />
        <div className="pb-20">
          <Navbar />
        </div>
      </div>
    ),
    private: false,
  },
  {
    id: 2,
    path: '/login',
    label: '로그인',
    element: <Auth />,
    private: false,
  },
  {
    id: 3,
    path: '/*',
    label: '404',
    element: <NotFound />,
    private: false,
  },
];

export const PrivateRoute = ({ children }: ChildrenProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn]);

  return <>{children}</>;
};

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router: RouterElement) => ({
    path: router.path,
    element: router.private ? (
      <PrivateRoute key={router.id}>{router.element}</PrivateRoute>
    ) : (
      <Fragment key={router.id}>{router.element}</Fragment>
    ),
  })),
);
