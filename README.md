# Alex Chen — Portfolio

A premium, production-grade single-page portfolio website built with vanilla HTML, CSS, and JavaScript. Responsive, accessible, SEO-optimized, with dark/light theme support.

## Project Overview

- **Type**: Static single-page portfolio
- **Tech**: HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript (ES6+)
- **Design**: Inter font, gradient accents, card-based layouts, timeline, dark mode
- **Sections**: Hero, About, Skills, Experience (timeline), Education, Projects, Certifications, Contact, Footer

## Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge — latest 2 versions)
- A local static file server (optional, for development with absolute paths)

## Quick Start

### Option 1: Open directly in browser

```bash
# Simply open index.html in your browser
open index.html
```

### Option 2: Use a local dev server

```bash
# Using Python 3
python3 -m http.server 3000

# Using Node.js (npx)
npx serve . -p 3000

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

The site will be available at `http://localhost:3000`.

## Project Structure

```
├── index.html          # Main HTML with all sections
├── style.css           # Full design system and responsive styles
├── script.js           # JavaScript interactions (Phase 3)
├── resume.pdf          # Placeholder resume
├── .env.example        # Environment variable template
└── README.md           # This file
```

## Features

- **Responsive**: Mobile-first design with breakpoints at 768px, 960px
- **Dark Mode**: Toggle with localStorage persistence
- **Smooth Scroll**: CSS `scroll-behavior: smooth` with JS enhancement
- **Timeline**: Alternating left/right layout on desktop, stacked on mobile
- **Animations**: Fade-in sections, hover card lifts, skill bar fills
- **Accessibility**: Semantic HTML, ARIA labels, focus-visible styles, reduced-motion support
- **SEO**: Open Graph, Twitter Cards, canonical URL, structured data (JSON-LD)

## Environment Variables

See `.env.example` for all required variables. For this static site, no environment variables are required for local development.
