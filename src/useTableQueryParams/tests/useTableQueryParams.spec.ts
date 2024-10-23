import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, it, afterEach, vi, expect } from 'vitest';

import { useTableQueryParams } from '../useTableQueryParams';



describe('useTableQueryParams', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const parseFiltersForRequest = vi.fn();
  const validateOrderBy = vi.fn();
  const prepareFiltersForComponents = vi.fn();
  const beforeSubmit = vi.fn().mockImplementation(data => data);
  prepareFiltersForComponents.mockImplementation((data: URLSearchParams) => {
    const res = {} as Record<string, string>;
    data.forEach((_, key) => {
      if (key && key !== 'limit' && key !== 'offset') {
        res[key] = data.get(key) ?? '';
      }
    });
    return res;
  });
  describe('should return base response', () => {
    it('test', () => {
      const { result } = renderHook(() => useTableQueryParams({
        parseFiltersForRequest,
        prepareFiltersForComponents,
        beforeSubmit,
        validateOrderBy,
        keys: [],
      }));
      expect(result.current.changeOrder).toBeTypeOf('function');
      expect(result.current.clearFilters).toBeTypeOf('function');
      expect(result.current.onSubmitFilters).toBeTypeOf('function');
      expect(result.current.setLimit).toBeTypeOf('function');
      expect(result.current.setOffset).toBeTypeOf('function');
      expect(result.current.setParams).toBeTypeOf('function');
      expect(result.current.params).toEqual(new URLSearchParams());
      expect(result.current.orderBy).toBeUndefined();
      expect(result.current.filtersForRequest).toBeUndefined();
      expect(result.current.filtersForRender).toEqual({});
      expect(result.current.limit).toEqual(5);
      expect(result.current.offset).toEqual(0);
    });
  });
  describe('should return prepared data', () => {
    it('test', () => {
      const search = '?task_type=3&result=5&operator=034462b6-5bb4-41ae-9de5-3087c99595ea&map=827&camera_type=1&mode=LazyJoe&limit=10&offset=4';
      vi.stubGlobal('location', {
        search,
        href: `http://localhost:3000/missions${search}`,
      });

      const mockParams = new URLSearchParams(search);

      const { result } = renderHook(() => useTableQueryParams({
        parseFiltersForRequest,
        prepareFiltersForComponents,
        beforeSubmit,
        validateOrderBy,
        keys: [],
      }));
      expect(result.current.limit).toEqual(10);
      expect(result.current.offset).toEqual(4);
      expect(parseFiltersForRequest).toBeCalledWith(mockParams);
      expect(prepareFiltersForComponents).toBeCalledWith(mockParams);
      expect(result.current.filtersForRender).toEqual({
        'camera_type': '1',
        'map': '827',
        'mode': 'LazyJoe',
        'operator': '034462b6-5bb4-41ae-9de5-3087c99595ea',
        'result': '5',
        'task_type': '3',
      });
    });
  });
  describe('should set default data', () => {
    it('test', () => {
      const search = '?task_type=3&result=5&operator=034462b6-5bb4-41ae-9de5-3087c99595ea&map=827&camera_type=1&mode=LazyJoe';
      vi.stubGlobal('location', {
        search,
        href: 'http://localhost:3000/',
      });
      const mockParams = new URLSearchParams(search);

      const defaultParams = {
        'camera_type': '1',
        'map': '827',
        'mode': 'LazyJoe',
        'operator': '034462b6-5bb4-41ae-9de5-3087c99595ea',
        'result': '5',
        'task_type': '3',
      };
      const { result } = renderHook(() => useTableQueryParams({
        parseFiltersForRequest,
        prepareFiltersForComponents,
        beforeSubmit,
        defaultParams,
        validateOrderBy,
        keys: [],
      }));
      expect(result.current.limit).toEqual(5);
      expect(result.current.params.get('camera_type')).toEqual(mockParams.get('camera_type'));
      expect(result.current.offset).toEqual(0);
      expect(result.current.filtersForRender).toEqual(defaultParams);
    });

  });
  describe('should set offset 0 after submit params', () => {
    it('test', () => {
      const { result } = renderHook(() => useTableQueryParams({
        parseFiltersForRequest,
        prepareFiltersForComponents,
        beforeSubmit,
        validateOrderBy,
        keys: [],
      }));

      act(() => {
        result.current.setOffset(1);
      });
      expect(result.current.offset).toEqual(1);
      act(() => {
        result.current.onSubmitFilters({});
      });
      expect(result.current.offset).toEqual(0);
    });
  });
  describe('should clear data', () => {
    it('test',  () => {
      const defaultParams = {
        'camera_type': '1',
        'map': '827',
        'mode': 'LazyJoe',
        'operator': '034462b6-5bb4-41ae-9de5-3087c99595ea',
        'result': '5',
        'task_type': '3',
      };

      const { result } = renderHook(() => useTableQueryParams({
        parseFiltersForRequest,
        prepareFiltersForComponents,
        beforeSubmit,
        defaultParams,
        validateOrderBy,
        keys: [],
      }));

      expect(result.current.filtersForRender).toEqual(defaultParams);
      act(() => {
        result.current.clearFilters();
      });
      waitFor(() => {
        expect(result.current.filtersForRender).toEqual({});
      });
    });
  });
});