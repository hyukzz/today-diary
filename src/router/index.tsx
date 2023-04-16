import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';

import Test from '@/components/pages/Test';
import DiaryWritePage from '@/components/pages/DiaryWritePage';
import Auth from '@/components/organisms/Auth/Auth';
import DiaryList from '@/components/organisms/DiaryList/DiaryList';

interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
}

const routerData: RouterElement[] = [
  {
    id: 1,
    path: '/',
    label: 'Home',
    element: <Test />,
  },
  {
    id: 2,
    path: '/login',
    label: '로그인',
    element: <Auth />,
  },
];

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => ({
    path: router.path,
    element: router.element,
  })),
);
