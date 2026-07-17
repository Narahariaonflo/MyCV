'use strict';

const request = require('supertest');

// Mock the fetchers before requiring the app
jest.mock('../../src/fetchers/specFetcher', () => ({
  fetchSpecs: jest.fn(),
  PHONE_PATHS: {
    'galaxy-s26-ultra': 'samsung_galaxy_s26_ultra',
    'iphone-17-pro-max': 'apple_iphone_17_pro_max',
  },
}));

jest.mock('../../src/fetchers/priceFetcher', () => ({
  fetchPrice: jest.fn(),
}));

const { fetchSpecs } = require('../../src/fetchers/specFetcher');
const { fetchPrice } = require('../../src/fetchers/priceFetcher');

const app = require('../../src/server');

const mockSpec1 = {
  id: 'galaxy-s26-ultra',
  brand: 'Samsung',
  model: 'Galaxy S26 Ultra',
  display: { size: '6.9 inches', resolution: '1440 x 3120', technology: 'Dynamic AMOLED 2X', refreshRate: '120Hz' },
  processor: { chipset: 'Snapdragon 8 Gen 4', cpu: 'Octa-core', gpu: 'Adreno 760' },
  ram: '12GB',
  storage: '256GB',
  camera: { rear: '200MP wide + 50MP ultrawide + 50MP telephoto', front: '12MP with autofocus' },
  battery: { capacity: '5000 mAh', charging: '45W wired, 25W wireless' },
  os: 'Android 15 with One UI 7',
  dimensions: '162.8 x 77.6 x 8.2 mm',
  weight: '219 g',
  fetchedAt: new Date().toISOString(),
};

const mockSpec2 = {
  id: 'iphone-17-pro-max',
  brand: 'Apple',
  model: 'iPhone 17 Pro Max',
  display: { size: '6.9 inches', resolution: '1320 x 2868', technology: 'Super Retina XDR OLED', refreshRate: '120Hz' },
  processor: { chipset: 'A18 Pro', cpu: 'Hexa-core', gpu: 'Apple GPU (6-core)' },
  ram: '8GB',
  storage: '256GB',
  camera: { rear: '48MP wide + 48MP ultrawide + 12MP telephoto', front: '12MP with autofocus' },
  battery: { capacity: '4685 mAh', charging: '35W wired, 25W MagSafe' },
  os: 'iOS 19',
  dimensions: '163.0 x 77.6 x 8.3 mm',
  weight: '225 g',
  fetchedAt: new Date().toISOString(),
};

const mockPrice1 = {
  phoneId: 'galaxy-s26-ultra',
  price: 1299,
  currency: 'USD',
  source: 'Samsung Official Store',
};

const mockPrice2 = {
  phoneId: 'iphone-17-pro-max',
  price: 1199,
  currency: 'USD',
  source: 'Apple Store',
};

describe('POST /generate-infographic', () => {
  beforeEach(() => {
    fetchSpecs.mockResolvedValueOnce(mockSpec1).mockResolvedValueOnce(mockSpec2);
    fetchPrice.mockResolvedValueOnce(mockPrice1).mockResolvedValueOnce(mockPrice2);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 and image/png for valid request', async () => {
    const res = await request(app)
      .post('/generate-infographic')
      .send({ phone1: 'galaxy-s26-ultra', phone2: 'iphone-17-pro-max' });

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('image/png');
    expect(res.body).toBeInstanceOf(Buffer);
  });

  it('returns 400 when phone1 is missing', async () => {
    const res = await request(app)
      .post('/generate-infographic')
      .send({ phone2: 'iphone-17-pro-max' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/phone1/);
  });

  it('returns 400 when phone2 is missing', async () => {
    const res = await request(app)
      .post('/generate-infographic')
      .send({ phone1: 'galaxy-s26-ultra' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/phone2/);
  });

  it('returns 400 for invalid phone identifiers', async () => {
    const res = await request(app)
      .post('/generate-infographic')
      .send({ phone1: 'invalid-phone', phone2: 'iphone-17-pro-max' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid phone identifier/);
  });
});

describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
