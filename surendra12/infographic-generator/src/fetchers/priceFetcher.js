'use strict';

const axios = require('axios');

const STORE_API_BASE = process.env.STORE_API_BASE_URL || '<to be replaced>';

/**
 * Fetch official pricing for a phone.
 * @param {string} phoneId - Canonical slug
 * @returns {Promise<object>} Normalized pricing data
 */
async function fetchPrice(phoneId) {
  // For MVP, return fallback pricing when the store API is not configured.
  // In production, this will hit the official store APIs.
  if (STORE_API_BASE === '<to be replaced>') {
    return getFallbackPrice(phoneId);
  }

  try {
    const url = `${STORE_API_BASE}/pricing/${phoneId}`;
    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'InfographicGenerator/1.0',
      },
    });

    return {
      phoneId,
      price: data.price,
      currency: data.currency || 'USD',
      source: data.source || 'Official Store',
      url: data.url || url,
      date: data.date || new Date().toISOString().slice(0, 10),
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.warn(`Price fetch failed for ${phoneId}, using fallback:`, err.message);
    return getFallbackPrice(phoneId);
  }
}

/**
 * Return hardcoded fallback pricing when live API is unavailable.
 */
function getFallbackPrice(phoneId) {
  const fallbacks = {
    'galaxy-s26-ultra': {
      phoneId: 'galaxy-s26-ultra',
      price: 1299,
      currency: 'USD',
      source: 'Samsung Official Store',
      url: 'https://www.samsung.com/us/smartphones/galaxy-s26-ultra/',
      date: new Date().toISOString().slice(0, 10),
      fetchedAt: new Date().toISOString(),
    },
    'iphone-17-pro-max': {
      phoneId: 'iphone-17-pro-max',
      price: 1199,
      currency: 'USD',
      source: 'Apple Store',
      url: 'https://www.apple.com/shop/buy-iphone/iphone-17-pro-max',
      date: new Date().toISOString().slice(0, 10),
      fetchedAt: new Date().toISOString(),
    },
  };

  const result = fallbacks[phoneId];
  if (!result) {
    throw new Error(`No fallback pricing for unknown phone: ${phoneId}`);
  }
  return result;
}

module.exports = { fetchPrice, getFallbackPrice };
