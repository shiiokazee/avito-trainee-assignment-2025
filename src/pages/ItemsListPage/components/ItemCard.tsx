import type { Advertisement } from '@/api/Api';
import { ROUTES } from '@/router';
import { Box, Button, Card, CardMedia, Chip, Typography } from '@mui/material';
import { generatePath, Link } from 'react-router';

import placeholderImage from '@/assets/placeholderImage.svg';

type ItemCardProps = {
  item: Advertisement;
};

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <Card sx={{ display: 'flex', flexWrap: 'nowrap', gap: 4 }}>
      <CardMedia
        component="img"
        src={item.images?.[0] ?? placeholderImage}
        sx={{ width: '100px' }}
      />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4">{item.title}</Typography>
        <Typography>{item.price}</Typography>
        <Box>
          <Chip label={item.category} />
          {item.createdAt && (
            <Typography>
              Создано: {new Date(item.createdAt).toLocaleString()}
            </Typography>
          )}
        </Box>
        <Link to={generatePath(ROUTES.item, { id: String(item.id) })}>
          <Button variant="text">Подробнее</Button>
        </Link>
      </Box>
    </Card>
  );
};
