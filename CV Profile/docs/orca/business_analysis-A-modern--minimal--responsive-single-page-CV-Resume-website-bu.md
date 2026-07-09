# business_analysis: A modern, minimal, responsive single-page CV/Resume website built with HTML, CSS, and vanilla JavaScript. It features a 

Status: draft

## outOfScope

- Dynamic PDF generation (resume is a static placeholder file).
- Actual contact form backend (e.g., Formspree, Netlify Forms) – it's a static mock.
- Real data or actual project images/screenshots; all content is placeholder.
- Full accessibility audit beyond basic semantic HTML and color contrast.
- Advanced SEO (structured data, sitemap, open graph) beyond basic meta tags.
- Analytics, tracking, or monitoring.
- Multi-page site or complex routing; everything on a single page.
- Integration with any external services (no CRM, no newsletter, no chat widgets).
- Animation/graphics frameworks (anime.js, GSAP) – animations are simple CSS and vanilla JS.
- Browser support beyond modern evergreen browsers (Chrome, Firefox, Edge, Safari).

## tlFeedback

- The BA requirements artifact is comprehensive, clear, and ready for implementation. All sections (user stories, acceptance criteria, assumptions, scopeQuestions, outOfScope) are well-defined, leaving no ambiguity for development. The acceptance criteria are technical and testable, covering all functional and non-functional aspects.

## assumptions

- Default theme is light; dark mode can be toggled by user.
- Typing animation for hero title is a typewriter effect that types out the professional title character by character with a blinking cursor; JavaScript implementation.
- Icons for skills and social media are inline SVGs embedded directly in HTML to avoid external dependencies; no icon library CDN used.
- Certifications section is kept as a separate section from Education as per user request.
- Contact form is static mock: on successful validation, a green success message 'Thank you for your message!' is shown, and all fields are cleared.
- The resume PDF is a static placeholder file ('resume.pdf') with dummy content (e.g., a single page with 'Resume placeholder' text) that can be replaced later. It is not generated dynamically.
- Placeholder images (profile photo, project screenshots) use a service like https://via.placeholder.com/ with dimensions and color, or a simple gray SVG placeholder, to be replaced by user.
- No backend or server-side processing; all animations, theme toggle, and navigation are handled client-side with vanilla JavaScript.
- Google Fonts (Inter or Poppins) is imported via CDN link in the <head>.
- The site is intended to be deployed as static files on any hosting service; no build tools required.
- Accessibility is considered but not deeply audited (color contrast met, focus styles, alt texts for images).

## userStories

- As a visitor, I want to see a professional hero section with the candidate's photo, name, title, a short introduction, and buttons to download resume and contact, so that I can quickly understand who they are and take action.
- As a visitor, I want a clear 'About Me' section summarizing experience, passion, and quick facts (location, email, phone, experience years) in cards, so I get an overview of the candidate.
- As a visitor, I want to see categorized skill sets (Frontend, Backend, etc.) with icons and progress bars that animate when scrolled into view, so I can assess technical proficiency at a glance.
- As a visitor, I want an interactive vertical timeline of work experiences with company, position, duration, description, and bullet achievements, so I can understand career progression.
- As a visitor, I want to view education details (degree, institution, year) in clean cards, so I can verify academic background.
- As a visitor, I want to browse project showcases in responsive cards with screenshot placeholders, title, description, tech stack, GitHub and live demo buttons, so I can evaluate the candidate's work.
- As a visitor, I want a certifications grid displaying certificate name, issuing organization, and year, separate from education, to highlight additional qualifications.
- As a visitor, I want to easily contact the candidate via a form (name, email, message) with validation and a clear success message, plus see separate contact details (email, phone, LinkedIn, GitHub), so I can reach out reliably.
- As a visitor, I want a sticky navigation bar with links to all sections, smooth scrolling, active section highlighting, a hamburger menu on mobile, and a scroll-to-top button, so I can navigate efficiently.
- As a visitor, I want a dark/light mode toggle that respects my preference, starting with a light default, to improve readability.
- As a visitor, I want subtle animations (fade-ins, card hover lifts, scroll progress bar) and a typewriter effect on the hero title to make the experience engaging.
- As a developer/owner, I want the code to be well-structured, semantic, SEO-friendly, and easy to edit placeholder content, so the site can be customized quickly.

## scopeQuestions

- What should be the default theme (light or dark)?
- What style of typing animation is preferred for the hero title? (Typewriter effect, fade-in, cursor blinking only, etc.)
- Which icon source/library should be used for skill icons and social media icons? (Inline SVGs, Font Awesome, Material Icons, etc.)
- Should the Certifications section be separate from or combined with the Education section?
- What should be the static success message text after contact form submission?
- What content should the resume PDF placeholder contain? (e.g., a generic single-page template, a specific text, etc.)

## tlReviewStatus

- Approved by Tech Lead

## tlChangeRequests


## acceptanceCriteria

- Hero section displays circular profile photo placeholder, name, professional title (with typewriter animation), 2-3 line introduction, 'Download CV' and 'Contact' buttons.
- Download CV button triggers download of a static placeholder PDF file named 'resume.pdf' with generic content.
- About Me shows short paragraph of introduction and quick fact cards (Location: placeholder, Email: placeholder, Phone: placeholder, Experience: N years).
- Skills are grouped into categories (Frontend, Backend, Database, Cloud, Tools) with each skill name and an icon (inline SVG) displayed in a responsive grid. Progress bars animate from 0% to a predefined value when the skills section enters the viewport.
- Experience timeline shows entries vertically with alternating alignment on desktop, each containing company name, position, duration (e.g., 2020 - Present), description, and bullet points of achievements.
- Education cards display degree name, institution, year, and optional GPA (shown as 'GPA: 3.8' if provided, otherwise hidden).
- Project cards are responsive (2-3 columns on desktop, 1 on mobile) featuring a gray placeholder image (using via.placeholder.com or similar), project title, short description, technology tags, and two buttons: 'GitHub' (with link placeholder) and 'Live Demo' (with link placeholder).
- Certifications section is separate from Education and displays cards in a grid with certificate name, issuing organization, and year.
- Contact section includes a form with fields: Name (required), Email (required, validated with regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/), Message (required). On submission, all fields are validated. If valid, display the static success message 'Thank you for your message!' in a non-intrusive manner (e.g., inline alert), and reset the form fields. Invalid fields show appropriate error messages below the field.
- Contact details (email, phone, LinkedIn, GitHub) are displayed clearly, with LinkedIn/GitHub clickable links.
- Footer includes copyright text '© 2025 Your Name. All rights reserved.' (placeholder), social media icons (LinkedIn, GitHub, Twitter) linking to placeholders, and a back-to-top button.
- Navigation bar is sticky at top, contains links: Home, About, Skills, Experience, Education, Projects, Certifications, Contact. On mobile, a hamburger menu toggles the navigation with smooth open/close animation.
- Smooth scrolling is implemented for anchor links. Active navigation link is highlighted based on scroll position using intersection observer.
- Dark/light mode toggle button is present in navigation. Default theme is light; toggle applies dark class to body, switching colors as defined. Toggle state persists via localStorage (optional for MVP but recommended).
- All sections animate with a fade-in effect and slight upward translation when scrolled into view using Intersection Observer.
- Hover lift effect on cards (scale up by 3% and increase shadow). Smooth button hover transitions (background color change with transition).
- Scroll progress indicator bar (thin, at the very top) updates as the user scrolls.
- Scroll-to-top floating button appears after scrolling down 300px and smoothly scrolls to top on click.
- Typography uses 'Inter' or 'Poppins' via Google Fonts link (included in <head>).
- Design uses a white background, subtle gray sections, primary accent #2563EB, rounded corners 12-16px, soft box-shadows.
- Fully responsive: desktop (960px+), tablet (768px–959px), mobile (<768px). Used CSS Grid and Flexbox.
- Semantic HTML5 tags (header, nav, section, footer, article, etc.) and proper heading hierarchy (h1 for name, h2 for section titles).
- Meta tags for description, viewport, character set, and lang attribute for SEO.
- Images have lazy loading attribute where applicable.
- Colors meet WCAG AA contrast standards (e.g., text on #2563EB background must be white with sufficient contrast).
- Code is modular: separate CSS and JS files, inline comments for key sections.
- All placeholder content (text, images, links) is clearly marked with comments for easy editing.
