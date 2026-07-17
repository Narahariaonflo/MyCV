'use strict';

const { getFallbackPrice, fetchPrice } = require('../../src/fetchers/priceFetcher');

describe('priceFetcher', () => {
  describe('getFallbackPrice', () => {
    it('returns fallback pricing for galaxy-s26-ultra', () => {
      const price = getFallbackPrice('galaxy-s26-ultra');
      expect(price.phoneId).toBe('galaxy-s26-ultra');
      expect(price.price).toBe(1299);
      expect(price.currency).toBe('USD');
      expect(price.source).toBe('Samsung Official Store');
    });

    it('returns fallback pricing for iphone-17-pro-max', () => {
      const price = getFallbackPrice('iphone-17-pro-max');
      expect(price.phoneId).toBe('iphone-17-pro-max');
      expect(price.price).toBe(1199);
      expect(price.currency).toBe('USD');
      expect(price.source).toBe('Apple Store');
    });

    it('throws for unknown phone id', () => {
      expect(() => getFallbackPrice('unknown')).toThrow('No fallback pricing');
    });
  });
});
