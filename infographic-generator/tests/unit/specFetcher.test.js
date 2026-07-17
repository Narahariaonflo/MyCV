'use strict';

const nock = require('nock');
const { fetchSpecs, normalizeSpecs, PHONE_PATHS } = require('../../src/fetchers/specFetcher');

const GSMARENA_BASE = 'https://www.gsmarena.com';

// Sample GSMArena HTML fragment
const sampleSpecHTML = `
<table class="specs-table">
  <tr><td class="ttl">Display</td><td class="nfo">6.9 inches Dynamic AMOLED 2X</td></tr>
  <tr><td class="ttl">Resolution</td><td class="nfo">1440 x 3120</td></tr>
  <tr><td class="ttl">Chipset</td><td class="nfo">Snapdragon 8 Gen 4</td></tr>
  <tr><td class="ttl">CPU</td><td class="nfo">Octa-core</td></tr>
  <tr><td class="ttl">GPU</td><td class="nfo">Adreno 760</td></tr>
  <tr><td class="ttl">RAM</td><td class="nfo">12GB</td></tr>
  <tr><td class="ttl">Storage</td><td class="nfo">256GB</td></tr>
  <tr><td class="ttl">Rear Camera</td><td class="nfo">200MP wide + 50MP ultrawide + 50MP telephoto</td></tr>
  <tr><td class="ttl">Front Camera</td><td class="nfo">12MP with autofocus</td></tr>
  <tr><td class="ttl">Battery</td><td class="nfo">5000 mAh</td></tr>
  <tr><td class="ttl">Charging</td><td class="nfo">45W wired, 25W wireless</td></tr>
  <tr><td class="ttl">OS</td><td class="nfo">Android 15 with One UI 7</td></tr>
  <tr><td class="ttl">Dimensions</td><td class="nfo">162.8 x 77.6 x 8.2 mm</td></tr>
  <tr><td class="ttl">Weight</td><td class="nfo">219 g</td></tr>
  <tr><td class="ttl">Refresh Rate</td><td class="nfo">120Hz</td></tr>
</table>
`;

describe('specFetcher', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchSpecs', () => {
    it('returns normalized specs for galaxy-s26-ultra', async () => {
      nock(GSMARENA_BASE)
        .get('/samsung_galaxy_s26_ultra.php')
        .reply(200, sampleSpecHTML);

      const specs = await fetchSpecs('galaxy-s26-ultra');

      expect(specs.id).toBe('galaxy-s26-ultra');
      expect(specs.brand).toBe('Samsung');
      expect(specs.model).toBe('Galaxy S26 Ultra');
      expect(specs.display.size).toBe('6.9 inches');
      expect(specs.display.technology).toBe('Dynamic AMOLED 2X');
      expect(specs.processor.chipset).toBe('Snapdragon 8 Gen 4');
      expect(specs.ram).toBe('12GB');
      expect(specs.storage).toBe('256GB');
      expect(specs.battery.capacity).toBe('5000 mAh');
      expect(specs.fetchedAt).toBeDefined();
    });

    it('returns normalized specs for iphone-17-pro-max', async () => {
      nock(GSMARENA_BASE)
        .get('/apple_iphone_17_pro_max.php')
        .reply(200, sampleSpecHTML.replace(/Samsung|Galaxy/g, 'Apple'));

      const specs = await fetchSpecs('iphone-17-pro-max');

      expect(specs.id).toBe('iphone-17-pro-max');
      expect(specs.brand).toBe('Apple');
      expect(specs.model).toBe('iPhone 17 Pro Max');
    });

    it('throws for unknown phone id', async () => {
      await expect(fetchSpecs('unknown-phone')).rejects.toThrow('Unknown phone identifier');
    });

    it('falls back to alternate selectors when specs-table is missing', async () => {
      const altHTML = `
        <table>
          <tr><td>display</td><td>6.7 inches OLED</td></tr>
          <tr><td>chipset</td><td>A18 Pro</td></tr>
        </table>
      `;

      nock(GSMARENA_BASE)
        .get('/samsung_galaxy_s26_ultra.php')
        .reply(200, altHTML);

      const specs = await fetchSpecs('galaxy-s26-ultra');
      expect(specs.display.technology).toBe('OLED');
    });

    it('uses fallback values when no data is scraped', async () => {
      nock(GSMARENA_BASE)
        .get('/samsung_galaxy_s26_ultra.php')
        .reply(200, '<html><body>No data</body></html>');

      const specs = await fetchSpecs('galaxy-s26-ultra');
      // Should have fallback values
      expect(specs.display.size).toBeDefined();
      expect(specs.ram).toBeDefined();
      expect(specs.storage).toBeDefined();
    });
  });
});
