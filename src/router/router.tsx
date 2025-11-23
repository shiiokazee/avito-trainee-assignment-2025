import { ItemDetailsPage } from '@/pages/ItemDetailsPage';
import { ItemsListPage } from '@/pages/ItemsListPage';
import { createBrowserRouter } from 'react-router';
import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.index,
    // FIXME: Добавить редирект
    element: <></>,
  },
  {
    path: ROUTES.list,
    element: <ItemsListPage />,
  },
  {
    path: ROUTES.item,
    element: <ItemDetailsPage />,
  },
]);
