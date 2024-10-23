import { useMemo } from 'react';

import { useSearchParams } from '../useSearchParams/useSearchParams';
import { prepareParams } from './utils';
import { PAGINATION_PARAMS } from './constants';
import { UsePaginationParamsDefaultArgs, UsePaginationParamsResponse } from './types';


export const usePaginationParams = (
  args?: UsePaginationParamsDefaultArgs,
): UsePaginationParamsResponse => {
  const [params, setParams] = useSearchParams();

  const DEFAULT_LIMIT = args?.limit ?? 5;
  const DEFAULT_OFFSET = args?.offset ?? 0;
  const offset = useMemo(() => prepareParams(params.get(PAGINATION_PARAMS.offset), DEFAULT_OFFSET),
    [params.get(PAGINATION_PARAMS.offset)]);
  const limit = useMemo(() => prepareParams(params.get(PAGINATION_PARAMS.limit), DEFAULT_LIMIT),
    [params.get(PAGINATION_PARAMS.limit)]);

  const setOffset = (newOffset: number) => {
    setParams(prev => {
      newOffset === DEFAULT_OFFSET
        ? prev.delete(PAGINATION_PARAMS.offset)
        : prev.set(PAGINATION_PARAMS.offset, String(newOffset));
      return prev;
    });
  };

  const setLimit = (newLimit: number) => {
    setParams(prev => {
      newLimit === DEFAULT_LIMIT
        ? prev.delete(PAGINATION_PARAMS.limit)
        : prev.set(PAGINATION_PARAMS.limit, String(newLimit));
      return prev;
    });
  };


  return {
    offset,
    limit,
    setOffset,
    setLimit,
    params,
    setParams,
  };
};