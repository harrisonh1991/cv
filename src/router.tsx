import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';

const Layout = lazy(() => import('@/layouts/layoutMain'));
const Home = lazy(() => import('@/pages/Home'));
const Profile = lazy(() => import('@/pages/Profile'));
const Works = lazy(() => import('@/pages/Works'));

const pages = [
  { index: true, element: <Home /> },
  { path: 'profile', element: <Profile /> },
  {
    path: 'works',
    element: <Works />,
  },
];

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/zh-HK/home" replace /> },
  {
    path: '/zh-HK',
    element: <Layout />,
    children: pages,
  },
  {
    path: '/en-US',
    element: <Layout />,
    children: pages,
  },
  { path: '*', element: <Navigate to="/zh-HK" replace /> },
]);

export default router;
