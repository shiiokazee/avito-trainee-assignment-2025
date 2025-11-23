import { apiClient } from '@/api/constants';
import { STATS_QUERY_KEYS } from '@/api/entities/stats';
import { Skeleton } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { useQuery } from 'react-query';

export const ActivityChart: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: STATS_QUERY_KEYS.activity,
    queryFn: () => apiClient.stats.chartActivityList(),
  });

  return isLoading ? (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  ) : (
    <BarChart
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dataset={data?.data ?? []}
      xAxis={[{ dataKey: 'date' }]}
      series={[
        {
          dataKey: 'approved',
          label: 'Одобрено',
        },
        {
          dataKey: 'rejected',
          label: 'Отклонено',
        },
        {
          dataKey: 'requestChanges',
          label: 'Запрошены доработки',
        },
      ]}
    />
  );
};
