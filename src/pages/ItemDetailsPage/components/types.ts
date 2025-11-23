import type { apiClient } from '@/api/constants';

export type AdActionType = 'reject' | 'requestChanges';

export type AdActionParams = Parameters<typeof apiClient.ads.rejectCreate>[1];
