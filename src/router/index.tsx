import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';

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
    element: <div className="text-6xl text-red-600 bg-red-500">test</div>,
  },
];

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => ({
    path: router.path,
    element: router.element,
  })),
);
