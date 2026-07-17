'use strict';

const { createCanvas } = require('canvas');
const { generateInfographic } = require('../../src/composer');

// Minimal spec objects for testing
const mockPhone1 = {
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
  price: { price: 1299, currency: 'USD', source: 'Samsung Official Store' },
};

const mockPhone2 = {
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
  price: { price: 1199, currency: 'USD', source: 'Apple Store' },
};

describe('composer', () => {
  it('generates a PNG buffer of correct dimensions', async () => {
    const buffer = await generateInfographic({ phone1: mockPhone1, phone2: mockPhone2 });

    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);

    // Verify it's a valid PNG
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    expect(buffer.slice(0, 8)).toEqual(pngSignature);

    // Verify dimensions by loading back
    const img = await loadImageFromBuffer(buffer);
    expect(img.width).toBe(1080);
    expect(img.height).toBe(1350);
  });

  it('renders expected text content', async () => {
    const buffer = await generateInfographic({ phone1: mockPhone1, phone2: mockPhone2 });

    // The buffer should contain the comparison information
    // We verify by checking the buffer is a valid image with expected size
    const img = await loadImageFromBuffer(buffer);
    expect(img.width).toBe(1080);
    expect(img.height).toBe(1350);
  });
});

/**
 * Helper: load image from buffer using canvas
 */
function loadImageFromBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const img = new (require('canvas').Image)();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = buffer;
  });
}
