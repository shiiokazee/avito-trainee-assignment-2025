import { apiClient, queryClient } from '@/api/constants';
import { ADS_QUERY_KEYS } from '@/api/entities/ads';
import { MODERAITION_HISTORY_ACTION_LABEL_MAP } from '@/constants/moderationHistory';
import { ROUTES } from '@/router';
import {
  NavigateNext as NextIcon,
  NavigateBefore as PreviosIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Grid,
  Paper,
  Rating,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useMutation, useQuery } from 'react-query';
import { generatePath, Link, useParams } from 'react-router';
import { ConfirmAdActionModal } from './components';
import type { AdActionParams } from './components/types';

export const ItemDetailsPage: React.FC = () => {
  const { id } = useParams();

  const [adActionType, setAdActionType] = useState<
    'reject' | 'requestChanges'
  >();

  const { data, isLoading, isError } = useQuery({
    queryKey: [ADS_QUERY_KEYS.ads, id],
    queryFn: () => apiClient.ads.getAds2(Number(id)),
  });

  const { mutateAsync: approveAd, isLoading: isApprovingAd } = useMutation({
    mutationFn: apiClient.ads.approveCreate,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [ADS_QUERY_KEYS.ads, id],
      }),
  });

  const { mutateAsync: rejectAd, isLoading: isRejectingAd } = useMutation({
    mutationFn: (params: AdActionParams) =>
      apiClient.ads.rejectCreate(Number(id), params),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [ADS_QUERY_KEYS.ads, id],
      }),
  });

  const { mutateAsync: requestAdChanges, isLoading: isRequestingAdChanges } =
    useMutation({
      mutationFn: (params: AdActionParams) =>
        apiClient.ads.requestChangesCreate(Number(id), params),
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: [ADS_QUERY_KEYS.ads, id],
        }),
    });

  const handleApprove = async () => {
    await approveAd(Number(id));
    // TODO: Уведомление и обновление кэша
  };

  const handleSubmitAdAction: React.ComponentProps<
    typeof ConfirmAdActionModal
  >['onSubmit'] = async (values) => {
    if (!adActionType) {
      return;
    }

    await (adActionType === 'reject' ? rejectAd : requestAdChanges)(values);

    // TODO: Уведомление и обновление кэша
  };

  if (isError) {
    return (
      <Alert severity="warning">
        <Typography>
          Объявление с заданным <code>id</code> не найдено
        </Typography>
        <Link to={generatePath(ROUTES.list)}>
          <Button>К списку объявлений</Button>
        </Link>
      </Alert>
    );
  }

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ md: 12, lg: 6 }}>
        <Paper sx={{ padding: 2 }}>
          {/* FIXME */}
          <Carousel sx={{ height: 400 }}>
            {data?.data.images?.map((image) => (
              <img key={image} src={image} />
            ))}
          </Carousel>
        </Paper>
      </Grid>

      <Grid size={{ md: 12, lg: 6 }}>
        <Paper
          sx={{ padding: 2, height: 400, maxHeight: 400, overflow: 'auto' }}
        >
          <Typography variant="h4">История модерации</Typography>

          <Box sx={{ mt: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Модератор</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell>Решение</TableCell>
                  <TableCell>Комментарий</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.moderationHistory?.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell>
                      {history.moderatorName}{' '}
                      <Typography variant="caption">
                        #{history.moderatorId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {new Date(history.timestamp ?? '').toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {history.action
                        ? MODERAITION_HISTORY_ACTION_LABEL_MAP[history.action]
                        : 'Неизветный тип'}
                    </TableCell>
                    <TableCell>{history.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h4">Описание товара</Typography>
          <Typography>{data?.data.description}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Значение</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(data?.data.characteristics ?? {}).map(
                ([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>

          <Card sx={{ mt: 4 }}>
            <CardHeader
              title={data?.data.seller?.name}
              subheader={`Зарегистрирован ${new Date(data?.data.seller?.registeredAt ?? '').toLocaleDateString()}`}
              action={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip
                    label={`Объявлений: ${data?.data.seller?.totalAds}`}
                    sx={{ mr: 1 }}
                  />
                  <Typography sx={{ fontWeight: 700 }}>
                    {data?.data.seller?.rating}
                  </Typography>
                  <Rating
                    value={Number(data?.data.seller?.rating)}
                    readOnly
                    precision={0.1}
                  />
                </Box>
              }
            />
          </Card>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Box sx={{ display: 'flex', columnGap: 1 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleApprove}
            loading={isApprovingAd}
          >
            Одобрить
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setAdActionType('reject')}
          >
            Отклонить
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setAdActionType('requestChanges')}
          >
            Запросить доработки
          </Button>
        </Box>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={generatePath(ROUTES.list)}>
            <Button>К списку объявлений</Button>
          </Link>
          <Box>
            {Number(id) > 1 && (
              <Link
                to={generatePath(ROUTES.item, { id: String(Number(id) - 1) })}
              >
                <Button startIcon={<PreviosIcon />}>Предыдущее</Button>
              </Link>
            )}
            <Link
              to={generatePath(ROUTES.item, { id: String(Number(id) + 1) })}
            >
              <Button endIcon={<NextIcon />}>Следующее</Button>
            </Link>
          </Box>
        </Box>
      </Grid>

      <ConfirmAdActionModal
        actionType={adActionType}
        loading={isRejectingAd || isRequestingAdChanges}
        open={Boolean(adActionType)}
        onSubmit={handleSubmitAdAction}
        onClose={() => setAdActionType(undefined)}
      />
    </Grid>
  );
};
