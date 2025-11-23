import { apiClient } from '@/api/constants';
import { ADS_QUERY_KEYS } from '@/api/entities/ads';
import { ROUTES } from '@/router';
import {
  Box,
  Button,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useQuery } from 'react-query';
import { generatePath, Link, useParams } from 'react-router';

export const ItemDetailsPage: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [ADS_QUERY_KEYS.ads, id],
    queryFn: () => apiClient.ads.getAds2(Number(id)),
  });

  if (isError) {
    <Box>
      <Typography variant="h4">
        Объявление с заданным <code>id</code> не найдено
      </Typography>
      <Link to={generatePath(ROUTES.list)}>
        <Button>К списку объявлений</Button>
      </Link>
    </Box>;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6 }}>
        <Paper sx={{ padding: 2 }}>
          <Carousel>
            {data?.data.images?.map((image) => (
              <img key={image} src={image} />
            ))}
          </Carousel>
        </Paper>
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h4">История модерации</Typography>
          {data?.data.moderationHistory?.map((history) => history.id)}
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
              {Object.entries(data?.data.characteristics).map(
                ([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Paper>
      </Grid>

      <Grid container size={{ xs: 12 }}>
        <Grid size={{ xs: 4 }}>
          <Button variant="contained" color="success">
            Одобрить
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
