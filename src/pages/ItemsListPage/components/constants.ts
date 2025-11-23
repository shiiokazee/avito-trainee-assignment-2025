import type { Advertisement } from '@/api/Api';
import type { ChipProps } from '@mui/material';

export const AD_STATUS_TO_CHIP_COLOR_MAP: Record<
  Exclude<Advertisement['status'], undefined>,
  ChipProps['color']
> = {
  approved: 'success',
  draft: 'default',
  pending: 'info',
  rejected: 'error',
};
