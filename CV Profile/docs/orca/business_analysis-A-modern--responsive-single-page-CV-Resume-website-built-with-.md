# business_analysis: A modern, responsive single-page CV/Resume website built with HTML, CSS, and JavaScript (or React) featuring a clean, mi

Status: draft

## outOfScope

- Backend server, database, or server-side rendering.
- User authentication or admin panel.
- Content management system (CMS) integration.
- Dynamic blog or news section.
- Real-time features (chat, updates).
- Contact form without a chosen form handling service (will be mock unless integration is configured).
- Multi-language support or localization.
- Integration with external job boards or social media feeds beyond links.

## assumptions

- The website is a static frontend with no backend server; all content is hardcoded or loaded from a local JSON file.
- Placeholder images and profile photo are provided via static assets; no image hosting service is needed.
- The contact form will not function out of the box; an integration with a form service (e.g., Formspree) is required for production use.
- The resume PDF is a static file hosted alongside the website.
- Frameworks/libraries (e.g., React, Inter font) can be loaded from CDNs or bundled; no API keys are needed for fonts.

## userStories

- As a visitor, I want to see a professional hero section with a photo, name, title, and introduction so I can quickly understand who the person is.
- As a visitor, I want a clear 'Download CV' and 'Contact Me' call-to-action so I can take immediate action.
- As a recruiter, I want to read about the candidate's experience and passion to gauge cultural fit.
- As a visitor, I want to see the candidate's skills grouped by category (Frontend, Backend, etc.) to assess technical expertise.
- As a visitor, I want a timeline of work experience with achievements to evaluate career progression.
- As a visitor, I want to see education details and certifications to verify qualifications.
- As a visitor, I want to view project highlights with live demo and GitHub links to assess practical work.
- As a visitor, I want a contact form to easily reach out without leaving the site.
- As a visitor, I want a responsive design that works on mobile, tablet, and desktop for a seamless experience.
- As a visitor, I want smooth animations and dark/light mode toggle for an enhanced visual experience.
- As a recruiter, I want the site to load quickly and be SEO-friendly to find it easily.

## scopeAnswers

- How should the contact form submission be handled? (e.g., use a service like Formspree, Netlify Forms, or keep it as a static mock?)
Answer: keep the static mock
- Should the resume PDF be generated dynamically or just a static placeholder file?
Answer: static
- Is a specific JavaScript framework required (React vs vanilla JS)? The deliverable can be in either.
Answer: Not

## scopeQuestions

- How should the contact form submission be handled? (e.g., use a service like Formspree, Netlify Forms, or keep it as a static mock?)
- Should the resume PDF be generated dynamically or just a static placeholder file?
- Is a specific JavaScript framework required (React vs vanilla JS)? The deliverable can be in either.

## acceptanceCriteria

- The page is fully responsive and maintains layout integrity on all common screen sizes (mobile, tablet, desktop).
- All textual content is semantic, accessible, and SEO-optimized with proper heading hierarchy.
- The sticky navigation bar highlights the active section on scroll and collapses to a hamburger menu on mobile.
- Color contrast meets WCAG AA standards for accessibility.
- Dark/light mode toggle persists user preference locally or via a switcher.
- Fade-in animations trigger when sections enter the viewport.
- Progress bars in the skills section animate when the section becomes visible.
- The Download Resume button initiates a download of a placeholder PDF file.
- The contact form includes client-side validation for required fields and email format.
- The scroll-to-top button appears after scrolling past the hero and smoothly scrolls to top.
- All external links (GitHub, LinkedIn, etc.) open in new tabs.
- Lighthouse performance score is ≥90 for all categories (Performance, Accessibility, Best Practices, SEO).
- Animations are disabled for users who prefer reduced motion.
