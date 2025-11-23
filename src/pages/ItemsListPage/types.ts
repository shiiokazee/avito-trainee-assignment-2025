import type { apiClient } from '@/api/constants';

export type GetAdsQuery = Exclude<
  Parameters<typeof apiClient.ads.getAds>[0],
  undefined
>;

export type ItemsFilter = Pick<
  GetAdsQuery,
  'search' | 'categoryId' | 'maxPrice' | 'minPrice' | 'status'
>;
