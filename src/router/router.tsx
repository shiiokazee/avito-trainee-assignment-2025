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
        path: ROUTES.list,
        element: <ItemsListPage />,
      },
      {
        path: ROUTES.item,
        element: <ItemDetailsPage />,
      },
      {
        path: ROUTES.stats,
        element: <StatsPage />,
      },
    ],
  },

  {
    // Редирект на главную для всех ненайденных страницы
    path: '*',
    element: <Navigate to={ROUTES.list} />,
  },
]);
