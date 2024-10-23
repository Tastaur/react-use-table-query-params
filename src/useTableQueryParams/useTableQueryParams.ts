import { useEffect, useMemo } from 'react';

import { usePaginationParams } from '../usePaginationParams/usePaginationParams';
import { Optional, OrderDirection, UseTableQueryParamsArgs, UseTableQueryParamsResponse } from './types';


export const useTableQueryParams = <
    QKey extends string,
    QObj extends Partial<Record<QKey, any>>,
    FObj extends Record<string, any>,
    OKey extends string,
    ODirection extends OrderDirection,
>({
    parseFiltersForRequest,
    prepareFiltersForComponents,
    beforeSubmit,
    validateOrderBy,
    defaultOrderKey,
    defaultParams,
    defaultDirection,
    offset: paramsOffset,
    limit: paramsLimit,
    keys,
  }: UseTableQueryParamsArgs<QKey, QObj, FObj, OKey, ODirection>)
  : UseTableQueryParamsResponse<QKey, QObj, FObj, OKey, ODirection> => {
  const { limit, setLimit, offset, setOffset, params, setParams } = usePaginationParams({
    offset: paramsOffset,
    limit: paramsLimit,
  });

  useEffect(() => {
    defaultParams && setParams(prev => {
      Object.entries(defaultParams as Record<string, string>).forEach(([key, value]) => {
        prev.set(key, value);
      });
      return prev;
    });
  }, [JSON.stringify(defaultParams)]);

  const filtersForRequest = useMemo<QObj>(() => {
    return parseFiltersForRequest(params);
  }, [
    params,
  ]);


  const filtersForRender = useMemo<FObj>(() => {
    return prepareFiltersForComponents(params);
  }, [
    params,
  ]);

  const onSubmitFilters = (data: FObj) => {
    const preparedData = beforeSubmit(data);
    setParams(prev => {
      Object.entries(preparedData).forEach(([key, value]) => {
        value ? prev.set(key, String(value)) : prev.delete(key);
      });
      return prev;
    });
    setOffset(0);
  };

  const clearFilters = () => {
    setParams(prev => {
      keys.forEach((key) => {
        prev.delete(key);
      });
      return prev;
    });
  };

  const orderBy = useMemo<Optional<OKey>>(() => {
    const orderKey = params.get('orderBy');
    return orderKey ? validateOrderBy(orderKey) : defaultOrderKey;
  }, [params.get('orderBy')]);

  const orderDirection = useMemo<Optional<ODirection>>(() => {
    const currentDirection = params.get('orderDirection');
    if (currentDirection !== 'asc' && currentDirection !== 'desc') {
      return undefined;
    }
    return (params.get('orderDirection') ?? defaultDirection) as Optional<ODirection>;
  }, [params.get('orderDirection'), defaultDirection]);

  const changeOrder = (key: OKey) => {
    const reg = new RegExp(key);
    setParams(prev => {
      if (orderBy && reg.test(orderBy)) {
        if ('desc' === orderDirection) {
          prev.delete('orderBy');
          prev.delete('orderDirection');
        } else {
          prev.set('orderDirection', 'desc');
        }
      } else {
        prev.set('orderBy', key);
        prev.set('orderDirection', 'asc');
      }
      return prev;
    });
  };

  return {
    limit,
    setLimit,
    offset,
    setOffset,
    filtersForRequest,
    filtersForRender,
    onSubmitFilters,
    clearFilters,
    params,
    setParams,
    changeOrder,
    orderBy,
    orderDirection,
  };
};