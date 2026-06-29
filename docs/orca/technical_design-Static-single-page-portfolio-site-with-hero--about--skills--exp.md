# technical_design: Static single-page portfolio site with hero, about, skills, experience, education, projects, certifications, contact, an

Status: draft

## riskNotes

- Low risk project. No external API dependencies. Potential challenges: browser compatibility for Intersection Observer (supported in all modern browsers but may need polyfill for very old ones; not required per scope). Placeholder images may fail if via.placeholder.com is down; can fall back to inline SVG placeholder. Dark mode persistence requires localStorage; ensure users without JS or private browsing get default light mode.

## backendPlan

- Not applicable. No backend services required.

## agentHandoff

- scaffoldingTask: Create index.html with doctype, lang='en', meta charset and viewport. Link style.css and script.js. Import Google Fonts (Inter). Build semantic structure: <header> with logo and <nav> (#home, #about, #skills, #experience, #education, #projects, #certifications, #contact) and hamburger button, <main> with <section id="home"> (hero), <section id="about">, <section id="skills">, <section id="experience">, <section id="education">, <section id="projects">, <section id="certifications">, <section id="contact">, <footer>. Each section contains placeholder content marked with <!-- TODO: replace ... -->. Hero includes placeholder photo (via.placeholder.com/150x150), name, title (span for typewriter), intro text, and two buttons. About has intro paragraph and 4 quick fact cards. Skills section has category headings and placeholder skill items with inline SVGs and data-progress attributes. Experience timeline uses ordered list with alternating alignment classes. Education and certifications show cards. Projects have placeholder images, title, description, tech tags, and link buttons. Contact includes form (name, email, message) and a div for contact details. Footer has copyright, social icons, and back-to-top button. Add placeholder resume.pdf in root with minimal content. Include style.css and script.js with minimal boilerplate (e.g., 'use strict').
- stylingTask: Using style.css, implement design system: CSS variables for colors (--bg: #ffffff, --section-bg: #f9fafb, --text: #111827, --accent: #2563EB, etc.), border-radius (12px-16px), shadows. Set base typography with font-family 'Inter', font sizes, line heights. Style navigation: sticky, background, links, hamburger icon (three lines) for mobile, hide/show with .nav-open class. Style hero section with centered content, circular photo, headings, buttons (accent background, white text, hover transition). Add dark mode overrides when body has class 'dark': --bg: #111827, --text: #f9fafb, etc. Responsive layout: all sections use max-width container, padding. Skills grid: flex-wrap, gap, progress bars with width set by inline style (controlled via JS later). Experience timeline: vertical line with dots, alternating left/right on desktop using CSS. Cards: white background, shadow, hover lift (transform: scale(1.03), transition). Form: stacked fields, validation states (error class with red border, success green). Add scroll progress bar fixed top: height 3px, background accent, width updated by JS. Back-to-top button fixed bottom right, hidden by default, appear after scroll. Add transitions and animations: fade-in sections with opacity 0 and transform translateY(20px) when not visible; .visible class sets opacity 1 and transform none, transition. Ensure responsive breakpoints: stack columns on mobile, adjust font sizes. Use media queries.
- interactionsTask: In script.js, implement: 1. Typewriter effect on element with id 'typewriter' – cycle through array of titles, typing and deleting characters with setTimeout. 2. Smooth scrolling for all anchor links with href starting with '#', prevent default, use scrollIntoView({ behavior: 'smooth' }). 3. IntersectionObserver for sections: add class 'visible' when ratio > 0.1 to trigger fade-in. 4. Navigation active state: observe each section, when intersecting, highlight corresponding nav link (add '.active' class). 5. Hamburger menu: toggle class '.nav-open' on body or nav, animate hamburger icon to X. 6. Skill progress bars: observe skills section, when intersecting, loop over skill elements and set their .progress-bar width to data-progress value with CSS transition. 7. Scroll-to-top button: show when scrollY > 300, hide otherwise; on click, scrollTo top. 8. Scroll progress bar: update width based on scroll position (scrollY / (document height - window height) * 100). 9. Contact form: on submit, prevent default, validate fields (name not empty, email regex, message not empty); if invalid, add error class to input and show error message span; if all valid, remove errors, display success message 'Thank you for your message!', reset form. 10. Dark mode toggle: button click toggles 'dark' class on body, saves preference in localStorage; on page load, check localStorage and apply theme (default light). Ensure all event listeners are added after DOMContentLoaded.

## databasePlan

- Not applicable. No data persistence required.

## frontendPlan

- Single page with seven main sections: Hero, About, Skills, Experience, Education, Projects, Certifications, Contact, Footer. Navigation is sticky with hamburger menu on mobile. Smooth scroll, active section highlighting using Intersection Observer, scroll-to-top button, and scroll progress bar. Animations: fade-in and slide-up on sections, skill bar fill, hover card lifts, typewriter effect on hero title. Form validation with regex and static success message. CSS custom properties for theming (light default; dark overrides). Responsive breakpoints: mobile <768px, tablet 768-959px, desktop 960px+. Layout uses CSS Grid and Flexbox.

## testStrategy

- Manual testing across Chrome, Firefox, Edge, Safari (latest). Verify all sections render correctly on desktop, tablet, mobile (using browser dev tools). Check form validation error and success states. Confirm dark mode toggle and persistence. Typewriter animation timing and smooth scrolling. Use axe DevTools for basic accessibility checks (color contrast, keyboard navigation). Validate HTML with W3C validator.

## dependencyPlan


## lowLevelDesign

- The entire application is a single HTML file (index.html) with linked style.css and script.js. No build tools, no frameworks. Google Fonts imported via CDN. Placeholder images served from via.placeholder.com. Resume is a static PDF placeholder. All interactions are client-side using Intersection Observer for scroll-driven animations and event listeners for nav, form, and theme toggle. Dark mode toggled with a CSS class on <body> and localStorage override. Semantic HTML5 structure with appropriate ARIA roles for accessibility baseline.

## blockedOnIntegrations


## implementationRoadmap

- Phase 1: Project Setup - Create index.html with basic document structure, all sections, semantic tags, and placeholder content; add style.css and script.js stubs; include Google Fonts; prepare placeholder assets (images, resume.pdf).
- Phase 2: Styling and Layout - Implement design system, responsive layouts, navigation, cards, forms, dark mode classes, and baseline visual styles.
- Phase 3: Interactions - Add JavaScript for smooth scrolling, navigation active state, hamburger menu, scroll-to-top, scroll progress bar, typewriter effect, skill bar animations, section fade-ins, form validation, and dark mode toggle.

## implementationApproach

- Step-by-step construction beginning with HTML scaffolding and semantic structure, followed by comprehensive CSS for visual design and responsiveness, then JavaScript for interactivity and animations. All code is modular within single files; no third-party libraries except Google Fonts. Placeholder content tracked with HTML comments for easy replacement.
