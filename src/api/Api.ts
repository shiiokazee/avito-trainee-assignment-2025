/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Advertisement {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  categoryId?: number;
  status?: "pending" | "approved" | "rejected" | "draft";
  priority?: "normal" | "urgent";
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  images?: string[];
  seller?: Seller;
  characteristics?: Record<string, string>;
  moderationHistory?: ModerationHistory[];
}

export interface Seller {
  id?: number;
  name?: string;
  rating?: string;
  totalAds?: number;
  /** @format date-time */
  registeredAt?: string;
}

export interface ModerationHistory {
  id?: number;
  moderatorId?: number;
  moderatorName?: string;
  action?: "approved" | "rejected" | "requestChanges";
  reason?: string | null;
  comment?: string;
  /** @format date-time */
  timestamp?: string;
}

export interface Pagination {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
}

export interface StatsSummary {
  totalReviewed?: number;
  totalReviewedToday?: number;
  totalReviewedThisWeek?: number;
  totalReviewedThisMonth?: number;
  approvedPercentage?: number;
  rejectedPercentage?: number;
  requestChangesPercentage?: number;
  averageReviewTime?: number;
}

export interface ActivityData {
  /** @format date */
  date?: string;
  approved?: number;
  rejected?: number;
  requestChanges?: number;
}

export interface DecisionsData {
  approved?: number;
  rejected?: number;
  requestChanges?: number;
}

export interface Moderator {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  statistics?: ModeratorStats;
  permissions?: string[];
}

export interface ModeratorStats {
  totalReviewed?: number;
  todayReviewed?: number;
  thisWeekReviewed?: number;
  thisMonthReviewed?: number;
  averageReviewTime?: number;
  approvalRate?: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:3001/api/v1",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title API для модерации объявлений
 * @version 1.0.0
 * @baseUrl http://localhost:3001/api/v1
 * @contact Стажерское задание (https://avito.ru)
 *
 * Упрощенная версия системы модерации объявлений платформы Авито
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  ads = {
    /**
     * No description
     *
     * @tags Объявления
     * @name GetAds
     * @summary Получить список объявлений с фильтрацией и пагинацией
     * @request GET:/ads
     */
    getAds: (
      query?: {
        /**
         * Номер страницы
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Количество элементов на странице
         * @min 1
         * @max 100
         * @default 10
         */
        limit?: number;
        /** Фильтр по статусу (можно указывать несколько) */
        status?: ("pending" | "approved" | "rejected" | "draft")[];
        /** Фильтр по ID категории */
        categoryId?: number;
        /** Минимальная цена */
        minPrice?: number;
        /** Максимальная цена */
        maxPrice?: number;
        /** Поиск по названию или описанию */
        search?: string;
        /**
         * Сортировка по полю
         * @default "createdAt"
         */
        sortBy?: "createdAt" | "price" | "priority";
        /**
         * Порядок сортировки
         * @default "desc"
         */
        sortOrder?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          ads?: Advertisement[];
          pagination?: Pagination;
        },
        {
          error?: string;
          message?: string;
        }
      >({
        path: `/ads`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Объявления
     * @name GetAds2
     * @summary Получить объявление по ID
     * @request GET:/ads/{id}
     * @originalName getAds
     * @duplicate
     */
    getAds2: (id: number, params: RequestParams = {}) =>
      this.request<
        Advertisement,
        | {
            error?: string;
            id?: number;
          }
        | {
            error?: string;
            message?: string;
          }
      >({
        path: `/ads/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Объявления
     * @name ApproveCreate
     * @summary Одобрить объявление
     * @request POST:/ads/{id}/approve
     */
    approveCreate: (id: number, params: RequestParams = {}) =>
      this.request<
        {
          message?: string;
          ad?: Advertisement;
        },
        | {
            error?: string;
            id?: number;
          }
        | {
            error?: string;
            message?: string;
          }
      >({
        path: `/ads/${id}/approve`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Объявления
     * @name RejectCreate
     * @summary Отклонить объявление
     * @request POST:/ads/{id}/reject
     */
    rejectCreate: (
      id: number,
      data: {
        /** Причина отклонения */
        reason:
          | "Запрещенный товар"
          | "Неверная категория"
          | "Некорректное описание"
          | "Проблемы с фото"
          | "Подозрение на мошенничество"
          | "Другое";
        /** Дополнительный комментарий */
        comment?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message?: string;
          ad?: Advertisement;
        },
        | {
            error?: string;
            message?: string;
          }
        | {
            error?: string;
            id?: number;
          }
      >({
        path: `/ads/${id}/reject`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Объявления
     * @name RequestChangesCreate
     * @summary Запросить изменения в объявлении
     * @request POST:/ads/{id}/request-changes
     */
    requestChangesCreate: (
      id: number,
      data: {
        /** Причина запроса изменений */
        reason:
          | "Запрещенный товар"
          | "Неверная категория"
          | "Некорректное описание"
          | "Проблемы с фото"
          | "Подозрение на мошенничество"
          | "Другое";
        /** Дополнительный комментарий */
        comment?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message?: string;
          ad?: Advertisement;
        },
        | {
            error?: string;
            message?: string;
          }
        | {
            error?: string;
            id?: number;
          }
      >({
        path: `/ads/${id}/request-changes`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  stats = {
    /**
     * No description
     *
     * @tags Статистика
     * @name SummaryList
     * @summary Получить общую статистику модератора
     * @request GET:/stats/summary
     */
    summaryList: (
      query?: {
        /** Период для фильтрации статистики */
        period?: "today" | "week" | "month" | "custom";
        /**
         * Начальная дата для произвольного периода (YYYY-MM-DD)
         * @format date
         */
        startDate?: string;
        /**
         * Конечная дата для произвольного периода (YYYY-MM-DD)
         * @format date
         */
        endDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        StatsSummary,
        {
          error?: string;
          message?: string;
        }
      >({
        path: `/stats/summary`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Статистика
     * @name ChartActivityList
     * @summary Получить данные графика активности
     * @request GET:/stats/chart/activity
     */
    chartActivityList: (
      query?: {
        /** Период для фильтрации статистики */
        period?: "today" | "week" | "month" | "custom";
        /**
         * Начальная дата для произвольного периода (YYYY-MM-DD)
         * @format date
         */
        startDate?: string;
        /**
         * Конечная дата для произвольного периода (YYYY-MM-DD)
         * @format date
         */
        endDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ActivityData[],
        {
          error?: string;
          message?: string;
        }
      >({
        path: `/stats/chart/activity`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Статистика
     * @name ChartDecisionsList
     * @summary Получить данные графика решений
     * @request GET:/stats/chart/decisions
     */
    chartDecisionsList: (
      query?: {
        /** Период для фильтрации статистики */
        period?: "today" | "week" | "month" | "custom";
        /**
         * Начальная дата для произвольного периода (YYYY-MM-DD)
         * @format date
         */
        startDate?: string;
        /**
         * Конечная дата для произвольного периода (YYYY-MM-DD)
         * @format date
         */
        endDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        DecisionsData,
        {
          error?: string;
          message?: string;
        }
      >({
        path: `/stats/chart/decisions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Статистика
     * @name ChartCategoriesList
     * @summary Получить данные графика категорий
     * @request GET:/stats/chart/categories
     */
    chartCategoriesList: (
      query?: {
        /** Период для фильтрации статистики */
        period?: "today" | "week" | "month" | "custom";
        /**
         * Начальная дата для произвольного периода (YYYY-MM-DD)
         * @format date
         */
        startDate?: string;
        /**
         * Конечная дата для произвольного периода (YYYY-MM-DD)
         * @format date
         */
        endDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        Record<string, number>,
        {
          error?: string;
          message?: string;
        }
      >({
        path: `/stats/chart/categories`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  moderators = {
    /**
     * No description
     *
     * @tags Модераторы
     * @name GetModerators
     * @summary Получить информацию о текущем модераторе
     * @request GET:/moderators/me
     */
    getModerators: (params: RequestParams = {}) =>
      this.request<
        Moderator,
        {
          error?: string;
          message?: string;
        }
      >({
        path: `/moderators/me`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
