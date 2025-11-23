import { apiClient } from '@/api/constants';
import { ADS_QUERY_KEYS } from '@/api/entities/ads';
import { Skeleton, Stack } from '@mui/material';
import { useQuery } from 'react-query';
import { ItemCard } from './components';

export const ItemsListPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: [ADS_QUERY_KEYS.ads],
    queryFn: () => apiClient.ads.getAds(),
  });

  return (
    <>
      <h1>Ads</h1>
      <Stack spacing={2}>
        {isLoading &&
          Array.from({ length: 10 }, (_, i) => i).map((i) => (
            <Skeleton
              key={`skeleton-${i}`}
              variant="rectangular"
              width="100%"
              height="200px"
            />
          ))}
        {data?.data.ads?.map((ad) => (
          <ItemCard key={ad.id} item={ad} />
        ))}
      </Stack>
    </>
  );
};
