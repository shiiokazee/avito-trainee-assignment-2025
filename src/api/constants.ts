import { QueryClient } from 'react-query';
import { Api } from './Api';

export const API_BASE_URL = import.meta.env.API_BASE_URL;

export const queryClient = new QueryClient();

export const apiClient = new Api();
