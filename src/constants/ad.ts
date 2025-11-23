import type { Advertisement } from '@/api/Api';
import type { apiClient } from '@/api/constants';

export const AD_STATUS_TO_LBABEL_MAP: Record<
  Exclude<Advertisement['status'], undefined>,
  string
> = {
  approved: 'Одобрено',
  rejected: 'Отклонено',
  draft: 'Черновик',
  pending: 'На модерации',
};

export const AD_PRIORITY_TO_LBABEL_MAP: Record<
  Exclude<Advertisement['priority'], undefined>,
  string
> = {
  normal: 'Обычный',
  urgent: 'Срочный',
};

export const ADS_SORT_BY_FIELD_TO_LABEL_MAP: Record<
  Exclude<
    Exclude<Parameters<typeof apiClient.ads.getAds>[0], undefined>['sortBy'],
    undefined
  >,
  string
> = {
  createdAt: 'Дата создания',
  price: 'Цена',
  priority: 'Приоритет',
};
