import { QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router';
import { queryClient } from './api/constants';
import { router } from './router';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
