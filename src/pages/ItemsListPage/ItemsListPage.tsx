import { apiClient } from '@/api/constants';
import { ADS_QUERY_KEYS } from '@/api/entities/ads';
import {
  AD_STATUS_TO_LBABEL_MAP,
  ADS_SORT_BY_FIELD_TO_LABEL_MAP,
} from '@/constants/ad';
import { useDebounce } from '@/hooks/useDebounce';
import type { SortDirection } from '@/types/misc';
import { Restore as RestoreIcon, Sort as SortIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Select,
  Skeleton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { ItemCard } from './components';
import type { GetAdsQuery, ItemsFilter } from './types';

export const ItemsListPage: React.FC = () => {
  const [filters, setFilters] = useState<ItemsFilter>(DEFAULT_FILTERS);
  const [sortingField, setSortingField] =
    useState<keyof typeof ADS_SORT_BY_FIELD_TO_LABEL_MAP>();
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedFilters = useDebounce(filters);

  const queryParams = useMemo<GetAdsQuery>(
    () => ({
      ...debouncedFilters,
      page: currentPage,
      sortBy: sortingField,
      sortOrder: sortDirection,
    }),
    [currentPage, debouncedFilters, sortDirection, sortingField]
  );

  const { data, isLoading } = useQuery({
    queryKey: [ADS_QUERY_KEYS.ads, queryParams],
    queryFn: () => apiClient.ads.getAds(queryParams),
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTotalPages(data?.data.pagination?.totalPages);
  }, [data?.data.pagination?.totalPages]);

  // Переход на первую страницу при изменении фильтров
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [debouncedFilters]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
        <Box sx={{ display: 'flex', flexFlow: 'row wrap', gap: 2 }}>
          <TextField
            label="Название объявления"
            sx={{ width: 300 }}
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
          />

          <TextField
            type="number"
            label="ID категории"
            value={filters.categoryId}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                categoryId: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />

          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Минимальная цена"
              value={filters.minPrice}
              type="number"
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
            />

            <Typography sx={{ mx: 1 }}>-</Typography>

            <TextField
              label="Максимальная цена"
              value={filters.maxPrice}
              type="number"
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
            />
          </Box>

          <FormControl>
            <InputLabel id="status">Статус</InputLabel>

            <Select
              sx={{ width: 200 }}
              labelId="status"
              id="status"
              variant="outlined"
              value={filters.status}
              multiple
              input={<OutlinedInput label="Статус" />}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: e.target.value as typeof filters.status,
                }))
              }
            >
              {Object.entries(AD_STATUS_TO_LBABEL_MAP).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="text"
            startIcon={<RestoreIcon />}
            onClick={() => setFilters(DEFAULT_FILTERS)}
          >
            Очистить фильтры
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl>
            <InputLabel id="sortBy">Сортировка</InputLabel>
            <Select
              sx={{ width: 200 }}
              labelId="sortBy"
              id="sortBy"
              variant="outlined"
              value={sortingField}
              input={<OutlinedInput label="Сортировка" />}
              onChange={(e) =>
                setSortingField(e.target.value as typeof sortingField)
              }
            >
              {Object.entries(ADS_SORT_BY_FIELD_TO_LABEL_MAP).map(
                ([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            onChange={(_, value) => setSortDirection(value)}
            exclusive
            value={sortDirection}
          >
            <ToggleButton value={'desc' satisfies SortDirection}>
              <SortIcon sx={{ transform: 'scale(-1)' }} />
            </ToggleButton>
            <ToggleButton value={'asc' satisfies SortDirection}>
              <SortIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Paper sx={{ padding: 2, mt: 2 }} elevation={5}>
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
      </Paper>

      <Pagination
        sx={{ mt: 2 }}
        count={totalPages}
        size="large"
        page={currentPage}
        onChange={(_, page) => setCurrentPage(page)}
      />
    </Box>
  );
};

const DEFAULT_FILTERS: ItemsFilter = {
  status: [],
  categoryId: '' as any,
  maxPrice: '' as any,
  minPrice: '' as any,
  search: '',
};
