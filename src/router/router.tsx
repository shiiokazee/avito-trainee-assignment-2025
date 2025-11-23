import { AppLayout } from '@/components/AppLayout';
import { ItemDetailsPage } from '@/pages/ItemDetailsPage';
import { ItemsListPage } from '@/pages/ItemsListPage';
import { StatsPage } from '@/pages/StatsPage';
import { createBrowserRouter, Navigate } from 'react-router';
import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.index,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.list} />,
      },
      {
        path: ROUTES.list,
        Component: ItemsListPage,
      },
      {
        path: ROUTES.item,
        Component: ItemDetailsPage,
      },
      {
        path: ROUTES.stats,
        Component: StatsPage,
      },
    ],
  },
  {
    // Редирект на главную для всех ненайденных страницы
    path: '*',
    element: <Navigate to={ROUTES.list} />,
  },
]);
