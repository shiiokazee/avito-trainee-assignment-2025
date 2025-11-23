import { apiClient } from '@/api/constants';
import { STATS_QUERY_KEYS } from '@/api/entities/stats';
import { Box, Skeleton, Typography } from '@mui/material';
import { useQuery } from 'react-query';

export const Summary = () => {
  const { data, isLoading } = useQuery({
    queryKey: STATS_QUERY_KEYS.summary,
    queryFn: () => apiClient.stats.summaryList(),
  });

  return isLoading ? (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  ) : (
    <Box>
      <Typography>
        Всего проверено объявлений: <b>{data?.data.totalReviewed}</b>
        <ul>
          <li>
            За сегодня: <b>{data?.data.totalReviewedToday}</b>
          </li>
          <li>
            За неделю: <b>{data?.data.totalReviewedThisWeek}</b>
          </li>
          <li>
            За месяц: <b>{data?.data.totalReviewedThisMonth}</b>
          </li>
        </ul>
      </Typography>
      <Typography>
        Процент одобренных: <b>{data?.data.approvedPercentage}%</b>
      </Typography>
      <Typography>
        Процент отклонённых: <b>{data?.data.totalReviewed}%</b>
      </Typography>
      <Typography>
        Среднее время на проверку 1-го объявления:{' '}
        <b>{data?.data.averageReviewTime}</b>
      </Typography>
    </Box>
  );
};
