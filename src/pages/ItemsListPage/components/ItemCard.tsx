import type { Advertisement } from '@/api/Api';
import { ROUTES } from '@/router';
import { Box, Button, Card, CardMedia, Chip, Typography } from '@mui/material';
import { generatePath, Link } from 'react-router';

import placeholderImage from '@/assets/placeholderImage.svg';
import {
  AD_PRIORITY_TO_LBABEL_MAP,
  AD_STATUS_TO_LBABEL_MAP,
} from '@/constants/ad';
import { formatMoneyRU } from '@/utils/money';
import { AD_STATUS_TO_CHIP_COLOR_MAP } from './constants';

type ItemCardProps = {
  item: Advertisement;
};

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <Card sx={{ display: 'flex', flexWrap: 'nowrap', gap: 4 }}>
      {/* FIXME: Форматирование цены и статус */}
      <CardMedia
        component="img"
        src={item.images?.[0] ?? placeholderImage}
        sx={{ width: '300px' }}
      />
      <Box sx={{ padding: 2, width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant="h4">{item.title}</Typography>
          <Box>
            {item.status && (
              <Chip
                label={AD_STATUS_TO_LBABEL_MAP[item.status]}
                color={AD_STATUS_TO_CHIP_COLOR_MAP[item.status]}
                variant="outlined"
                sx={{ mr: 1 }}
              />
            )}
            {item.priority && (
              <Chip
                label={AD_PRIORITY_TO_LBABEL_MAP[item.priority]}
                color={item.priority === 'urgent' ? 'error' : 'info'}
              />
            )}
          </Box>
        </Box>
        <Typography>
          Цена:{' '}
          <b>{item.price ? formatMoneyRU(item.price) : 'Цена не указана'}</b>
        </Typography>
        <Typography>
          Категория: <b>{item.category}</b>
        </Typography>
        {item.createdAt && (
          <Typography>
            Создано: <b>{new Date(item.createdAt).toLocaleString()}</b>
          </Typography>
        )}

        <Box sx={{ mt: 2 }}>
          <Link to={generatePath(ROUTES.item, { id: String(item.id) })}>
            <Button variant="contained">Подробнее</Button>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};
