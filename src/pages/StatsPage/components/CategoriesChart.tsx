import { apiClient } from '@/api/constants';
import { STATS_QUERY_KEYS } from '@/api/entities/stats';
import { Skeleton } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { useQuery } from 'react-query';

export const CategoriesChart: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: STATS_QUERY_KEYS.categories,
    queryFn: () => apiClient.stats.chartCategoriesList(),
  });

  const transformedData = data?.data
    ? Object.entries(data.data).map(([key, value]) => ({ key, value }))
    : [];

  return isLoading ? (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  ) : (
    <BarChart
      dataset={transformedData}
      yAxis={[{ dataKey: 'key' }]}
      series={[
        {
          dataKey: 'value',
          valueFormatter: (value) => value?.toFixed(0) ?? '',
        },
      ]}
      layout="horizontal"
    />
  );
};
