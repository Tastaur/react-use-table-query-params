import { UsePaginationParamsDefaultArgs, UsePaginationParamsResponse } from '../usePaginationParams/types';


export type Optional<T> = T | undefined;

export type OrderDirection = 'asc' | 'desc';

export interface UseTableQueryParamsArgs<
    QKey extends string,
    QObj extends Partial<Record<QKey, any>>,
    FObj extends Record<string, any>,
    OKey extends string,
    ODirection extends OrderDirection,
> extends UsePaginationParamsDefaultArgs {
  parseFiltersForRequest: (params: URLSearchParams) => QObj,
  prepareFiltersForComponents: (params: URLSearchParams) => FObj
  beforeSubmit: (data: FObj) => QObj
  validateOrderBy: (key: string) => Optional<OKey>
  defaultOrderKey?: OKey
  defaultParams?: QObj
  defaultDirection?: ODirection
}

export interface UseTableQueryParamsResponse<
    QKey extends string,
    QObj extends Partial<Record<QKey, any>>,
    FObj extends Record<string, any>,
    OKey extends string,
    ODirection extends OrderDirection,
> extends UsePaginationParamsResponse {
  filtersForRequest: QObj,
  filtersForRender: FObj,
  onSubmitFilters: (data: FObj) => void,
  clearFilters: () => void,
  changeOrder: (key: OKey) => void,
  orderBy: Optional<OKey>,
  orderDirection: Optional<ODirection>,
}