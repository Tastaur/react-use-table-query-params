import { expect, describe, it } from 'vitest';

import { prepareParams } from '../utils';


describe('usePaginationParams utils', () => {
  describe('prepareParams', () => {
    it('should return fallback value', () => {
      expect(prepareParams(null, 0)).toEqual(0);
      expect(prepareParams('sdf', 4)).toEqual(4);
    });
    it('should return value', () => {
      expect(prepareParams('1', 0)).toEqual(1);
      expect(prepareParams('-2.3', 0)).toEqual(-2.3);
    });
  });
});