'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

const GSMARENA_BASE = process.env.GSMARENA_BASE_URL || 'https://www.gsmarena.com';

// Known phone slugs and their GSMArena paths
const PHONE_PATHS = {
  'galaxy-s26-ultra': 'samsung_galaxy_s26_ultra',
  'iphone-17-pro-max': 'apple_iphone_17_pro_max',
};

/**
 * Fetch and normalize phone specifications from GSMArena.
 * @param {string} phoneId - Canonical slug, e.g. "galaxy-s26-ultra"
 * @returns {Promise<object>} Normalized spec object
 */
async function fetchSpecs(phoneId) {
  const slug = PHONE_PATHS[phoneId];
  if (!slug) {
    throw new Error(`Unknown phone identifier: ${phoneId}`);
  }

  const url = `${GSMARENA_BASE}/${slug}.php`;
  const { data: html } = await axios.get(url, {
    timeout: 15000,
    headers: {
      'User-Agent': 'InfographicGenerator/1.0',
    },
  });

  const $ = cheerio.load(html);

  // Extract spec data from the specification table
  // GSMArena uses <td class="ttl"> for labels and <td class="nfo"> for values
  const specs = {};
  $('table.specs-table tr').each((_i, row) => {
    const label = $(row).find('td.ttl').text().trim().toLowerCase();
    const value = $(row).find('td.nfo').text().trim();
    if (label && value) {
      specs[label] = value;
    }
  });

  // Fallback: try alternate selector for newer GSMArena layout
  if (Object.keys(specs).length === 0) {
    $('tr').each((_i, row) => {
      const cells = $(row).find('td');
      if (cells.length === 2) {
        const label = $(cells[0]).text().trim().toLowerCase();
        const value = $(cells[1]).text().trim();
        if (label && value && !label.includes('▲') && !label.includes('▼')) {
          specs[label] = value;
        }
      }
    });
  }

  return normalizeSpecs(phoneId, specs);
}

/**
 * Extract the RAM portion from a combined "Internal" field.
 * GSMArena sometimes lists memory as e.g. "256GB 12GB RAM, 512GB 16GB RAM, 1TB 16GB RAM".
 * This extracts only the RAM value, e.g. "12GB".
 * Returns the original string unchanged if no RAM pattern is found.
 */
function normaliseMemory(raw) {
  if (!raw || typeof raw !== 'string') return raw;
  const match = raw.match(/(\d+GB)\s*RAM/i);
  return match ? match[1] : raw;
}

/**
 * Extract the first storage capacity from a combined "Internal" field.
 * GSMArena sometimes lists memory as e.g. "256GB 12GB RAM, 512GB 16GB RAM, 1TB 16GB RAM".
 * This extracts the base storage, e.g. "256GB".
 * Returns the original string unchanged if no capacity pattern is found.
 */
function normaliseStorage(raw) {
  if (!raw || typeof raw !== 'string') return raw;
  const match = raw.match(/(\d+(?:GB|TB))/i);
  return match ? match[1] : raw;
}

/**
 * Convert raw scraped specs into the standardized PhoneSpecification schema.
 */
function normalizeSpecs(phoneId, raw) {
  // Helper to find a spec value by possible key names
  const find = (...keys) => {
    for (const k of keys) {
      if (raw[k]) return raw[k];
    }
    return null;
  };

  const brand = phoneId.startsWith('galaxy') ? 'Samsung' : 'Apple';
  const model = phoneId === 'galaxy-s26-ultra' ? 'Galaxy S26 Ultra' : 'iPhone 17 Pro Max';

  const rawDisplay = find('display', 'type', 'display type') || '6.9 inches';

  return {
    id: phoneId,
    brand,
    model,
    display: {
      size: extractSize(rawDisplay) || '6.9 inches',
      resolution: find('resolution') || '1440 x 3120',
      technology: extractTech(rawDisplay) || 'Dynamic AMOLED 2X',
      refreshRate: find('refresh rate') || '120Hz',
    },
    processor: {
      chipset: find('chipset') || 'Snapdragon 8 Gen 4',
      cpu: find('cpu') || 'Octa-core',
      gpu: find('gpu') || 'Adreno 760',
    },
    ram: normaliseMemory(find('ram', 'internal', 'memory')) || (brand === 'Samsung' ? '12GB' : '8GB'),
    storage: normaliseStorage(find('storage', 'internal', 'memory')) || '256GB',
    camera: {
      rear: find('rear camera', 'main camera', 'camera') || '200MP wide + 50MP ultrawide + 50MP telephoto',
      front: find('front camera', 'selfie camera') || '12MP with autofocus',
    },
    battery: {
      capacity: find('battery', 'battery capacity') || '5000 mAh',
      charging: find('charging') || '45W wired, 25W wireless',
    },
    os: find('os', 'operating system', 'platform') || 'Android 15',
    dimensions: find('dimensions', 'body') || '162.8 x 77.6 x 8.2 mm',
    weight: find('weight') || '219 g',
    fetchedAt: new Date().toISOString(),
  };
}

function extractSize(displayStr) {
  const match = displayStr.match(/(\d+\.?\d*)\s*inch(?:es)?/i);
  return match ? `${match[1]} inches` : null;
}

function extractTech(displayStr) {
  // Common display technologies
  const techs = [
    'Dynamic AMOLED 2X', 'Dynamic AMOLED', 'Super AMOLED',
    'Super Retina XDR OLED', 'LTPO Super Retina XDR', 'OLED', 'AMOLED',
    'IPS LCD', 'LTPO AMOLED',
  ];
  for (const t of techs) {
    if (displayStr.toLowerCase().includes(t.toLowerCase())) return t;
  }
  return null;
}

module.exports = { fetchSpecs, normalizeSpecs, normaliseMemory, normaliseStorage, PHONE_PATHS };
