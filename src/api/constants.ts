import { AxiosError } from 'axios';
import { QueryClient } from 'react-query';
import { Api } from './Api';

export const API_BASE_URL = import.meta.env.API_BASE_URL;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(_, error) {
        if (error instanceof AxiosError && error.status === 404) {
          return false;
        }

        return true;
      },
    },
  },
});

export const apiClient = new Api({
  baseURL: API_BASE_URL,
});
