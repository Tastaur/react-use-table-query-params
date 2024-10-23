import { renderHook } from '@testing-library/react';
import { afterAll, describe, expect, it, vitest } from 'vitest';

import { usePaginationParams } from '../usePaginationParams';


describe('usePaginationParams test', () => {
  afterAll(() => {
    vitest.clearAllMocks();
  });

  it('should return default params', () => {
    const { result } = renderHook(() => usePaginationParams());
    expect(result.current.offset).toEqual(0);
    expect(result.current.limit).toEqual(5);
    expect(result.current.setLimit).toBeTypeOf('function');
    expect(result.current.setOffset).toBeTypeOf('function');
    expect(result.current.setParams).toBeTypeOf('function');
  });

  it('should return defined params', () => {
    const { result } = renderHook(() => usePaginationParams({ offset: 10, limit: 10 }));
    expect(result.current.offset).toEqual(10);
    expect(result.current.limit).toEqual(10);
  });
});