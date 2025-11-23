import type { ModerationHistory } from '@/api/Api';

export const MODERAITION_HISTORY_ACTION_LABEL_MAP: Record<
  Exclude<ModerationHistory['action'], undefined>,
  string
> = {
  approved: 'Одобрено',
  rejected: 'Отклонено',
  requestChanges: 'Запрошены доработки',
} as const;
