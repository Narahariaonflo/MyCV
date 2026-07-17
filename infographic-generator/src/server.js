'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const { generateInfographic } = require('./composer');
const { fetchSpecs } = require('./fetchers/specFetcher');
const { fetchPrice } = require('./fetchers/priceFetcher');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// --------------- Middleware ---------------
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());

const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:5173')
  .split(',')
  .map(s => s.trim());

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (server-to-server, curl)
    if (!origin || corsOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/generate-infographic', limiter);

// Serve static frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

// --------------- Routes ---------------

/**
 * POST /generate-infographic
 * Body: { phone1: "galaxy-s26-ultra", phone2: "iphone-17-pro-max" }
 * Returns: image/png
 */
app.post('/generate-infographic', async (req, res) => {
  try {
    const { phone1, phone2 } = req.body;

    if (!phone1 || !phone2) {
      return res.status(400).json({
        error: 'Both phone1 and phone2 identifiers are required.',
      });
    }

    const validIds = ['galaxy-s26-ultra', 'iphone-17-pro-max'];
    if (!validIds.includes(phone1) || !validIds.includes(phone2)) {
      return res.status(400).json({
        error: `Invalid phone identifier(s). Valid options: ${validIds.join(', ')}`,
      });
    }

    // Fetch data in parallel
    const [specs1, specs2, price1, price2] = await Promise.all([
      fetchSpecs(phone1),
      fetchSpecs(phone2),
      fetchPrice(phone1),
      fetchPrice(phone2),
    ]);

    const imageBuffer = await generateInfographic({
      phone1: { ...specs1, price: price1 },
      phone2: { ...specs2, price: price2 },
    });

    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=3600');
    res.send(imageBuffer);
  } catch (err) {
    console.error('Infographic generation error:', err);
    res.status(502).json({
      error: 'Failed to generate infographic. Some data sources may be unavailable.',
    });
  }
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// --------------- Start ---------------
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Infographic generator running on http://localhost:${PORT} [${NODE_ENV}]`);
  });
}

module.exports = app;
