import { apiClient } from '@/api/constants';
import { STATS_QUERY_KEYS } from '@/api/entities/stats';
import { Skeleton } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { useQuery } from 'react-query';

export const DecisionsChart: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: STATS_QUERY_KEYS.decisions,
    queryFn: () => apiClient.stats.chartDecisionsList(),
  });

  return isLoading ? (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  ) : (
    <PieChart
      series={[
        {
          data: [
            {
              id: 0,
              value: data!.data.approved!,
              label: 'Одобрено',
            },
            {
              id: 1,
              value: data!.data.rejected!,
              label: 'Отклонено',
            },
            {
              id: 2,
              value: data!.data.requestChanges!,
              label: 'Запрошены доработки',
            },
          ],
        },
      ]}
    />
  );
};
