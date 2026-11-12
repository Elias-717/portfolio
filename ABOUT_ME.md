# About me (fill in what you can; Claude Code will interview you for the rest)

## Basics
- Name:
- Role / title:
- One-line pitch:
- Location (only if you want it public):

## Bio
(a few sentences about you)

## Skills / services

## Projects
### 1. Mobile app
- Name / what it does:
- Built with:
- Live URL or how to run it:

### 2. Web app
- Name / what it does:
- Built with:
- Live URL:
- Login needed? Guest mode possible?

### 3. Website
- Name / what it does:
- Live URL:

## Links (email, GitHub, LinkedIn, etc.)

## Design preferences (mood, colors, sites you like)
Portfolio Content Brief — Elias Al-Sumairi
This brief tells an AI agent everything Elias's portfolio website must contain, and exactly what to ask him for before building each page.
How to use this brief
You are building a portfolio website for Elias Al-Sumairi from a template. Everything here marked as verified comes from his LinkedIn profile, his GitHub repositories or his confirmed CV leadership section. Treat anything in the open questions section as unconfirmed.
1.	Read the whole brief, then fit its content into the template's own pages and components; do not change the template's structure unless a page here has no home.
2.	Before writing any page, ask Elias for the assets listed under it: screenshots, links, samples and proof. Ask for one project at a time, as a short numbered list, and wait for his answer.
3.	Never invent a metric, quote, date, client, award or screenshot. If an asset is missing, leave a clearly marked placeholder and add it to a running list of what is still needed.
4.	Write in first person, plain English, short sentences. Lead each project with the problem and the outcome, then the technical detail.
5.	At the end, give Elias the list of placeholders still open and the questions he has not answered.
Site structure
The portfolio needs eight pages or sections; the project case studies are the core.
Page	Purpose	Must contain
Home	First impression in 10 seconds	Name, headline, one-line pitch, three featured projects (Voluntree, Insightly, Brokely), links to resume and contact
Projects	Index of all work	Four cards: title, one-line outcome, stack tags, thumbnail, links
Project case study (one per project)	Prove the work	Problem, role, solution, key screens, technical decisions, results, stack, live and code links
About	Human context	Short summary, background in teaching, public speaking, music and design, languages
Experience and leadership	Show teamwork	Team United and Maybank #Mbassador entries with outcomes
Skills and certifications	Scannable proof	Skills grouped by what projects prove; certifications with credential links
Resume	Fast download	Link to the resume PDF and a short summary
Contact	Make it easy to reach him	Email, LinkedIn, GitHub, optional contact form
Optional, ask Elias first: an Arabic/English language toggle (he already built right-to-left support in Sana'a House), and a short blog or notes section.
Identity and verified facts
Use these exactly as written; they match his LinkedIn profile and GitHub.
Field	Value
Name	Elias Al-Sumairi
Headline (LinkedIn)	CS Student, Software Engineer, Full-Stack Development, React, Node, Data and AI
Location	Alor Setar, Kedah, Malaysia
Email	eliassumairi@gmail.com
LinkedIn	https://www.linkedin.com/in/elias-al-sumairi-1b55b5324
GitHub	https://github.com/Elias-717
Degree	Bachelor of Computer Science (Data Science), Universiti Antarabangsa Albukhary (AIU), 2024 to 2027
Languages	Arabic (native), English (full professional), Malay (elementary)
Background outside code	Teaching, public speaking, music, creative design
Short bio to adapt: Elias builds practical, well-structured software and likes taking an idea from first concept to a working product, learning the engineering decisions along the way. His focus is full-stack development, with growing interest in backend systems, data, AI and automation.
Ask Elias for:
•	☐ A professional headshot, or confirmation he wants none
•	☐ His preferred one-line tagline, if he does not like the headline above
•	☐ A custom domain name, if he has one
•	☐ Colour or style preferences, and whether the site should be bilingual (English and Arabic)
•	☐ Permission to show his email address publicly
Project 1: Voluntree (feature this first)
One line: A campus volunteering platform that fills event slots fairly, built for the MMC Upstart 2026 Catalyst (Focus Area 02, Smart Campus and Institutional Systems).
Problem: Volunteer slots at AIU go to whoever replies first in WhatsApp and Telegram groups. In a 20-student survey, 7 of 13 applicants had been turned away at least once and 4 of 13 volunteers never received a certificate.
His role: Team lead and developer. The team was Elias Al-Sumairi and Khathera Rezaie (developers), Wazhma Maroof (research) and Mohammed Khalid Abdo (presenter). Khathera owned the matching, certificate and evaluation modules; credit her for those.
What it does:
•	AI drafts a mission from a pasted event announcement; a person always edits and publishes.
•	A transparent score recommends students with fewer past opportunities and explains why ("Why recommended").
•	Capacity is enforced by the database, so no race for slots.
•	QR check-in, organizer-approved attendance, then a PDF certificate and growth of the student's private date palm.
•	Admin view with a fairness chart, dean-approval queue and logged revocations.
Results (synthetic data, say so on the page): Across a simulation of 100 students and 20 missions, Voluntree placed 88.9% of first-time volunteers against 66.7% under first-come-first-served, and was fairer on 10 of 10 further random seeds. State the trade-off honestly: the most experienced 10% of students receive fewer new placements.
Stack: Next.js (App Router), TypeScript, Tailwind CSS, Supabase (PostgreSQL, row-level security, 12 migrations), Groq LLM, pdf-lib, Vitest, Vercel.
Links: Live demo https://joinvoluntree.vercel.app, code https://github.com/Elias-717/voluntree
Ask Elias for:
•	☐ Screenshots: landing page, student home with the watering gauge, a mission with "Why recommended", the organizer's AI draft screen, QR attendance screen, admin fairness chart
•	☐ A sample certificate PDF (synthetic data only)
•	☐ The evaluation results chart or table from the repo, and a survey slide if he is happy to show it
•	☐ The Figma wireframes link and one wireframe image
•	☐ A short screen recording or GIF of the core journey (demo video fallback)
•	☐ The competition outcome (finalist, placed, or not yet announced) and permission to state it
•	☐ Whether the live demo is still up, and whether he wants the other team members' names shown
Project 2: Insightly (feature second)
One line: A privacy-first data profiling tool: drop in a CSV and get the story, with files that never leave the browser.
Problem: Getting a quick, honest read on a messy dataset usually means uploading it to a service or writing code first.
His role: Solo developer (ask Elias to confirm).
What it does:
•	Detects delimiter and column types, with manual override.
•	Gives a 0 to 100 data quality score with a transparent breakdown.
•	Shows per-column statistics, histograms, category bars, time series, scatter plots, a correlation heatmap and box plots.
•	Writes 8 to 12 ranked plain-English insights ("Whispers"), each a pure function in its own file.
•	Offers cleaning helpers with a before and after score, a virtualised table for 50,000+ rows, and PDF, HTML and Markdown export.
Technical decisions worth a paragraph: Parsing and analysis run in a Web Worker so the interface stays responsive; a Content-Security-Policy restricts network connections; the README shows how anyone can verify privacy in the browser's Network tab.
Quality evidence: 163 unit and component tests, 12 Playwright end-to-end and accessibility tests on desktop and a 375px mobile viewport, strict TypeScript, GitHub Actions CI.
Stack: Next.js 14 (static export), TypeScript, Tailwind CSS, Recharts, Papaparse, jsPDF, Vitest, Playwright.
Links: code https://github.com/Elias-717/insightly; live link to be confirmed.
Ask Elias for:
•	☐ The live URL, or confirmation it is not deployed yet
•	☐ Screenshots: upload screen, overview with quality score, a column profile, charts and correlation heatmap, the Whispers insights, a cleaning before and after, dark mode, the mobile view
•	☐ A short screen recording of dropping a sample CSV and reading the result
•	☐ A sample exported PDF report
•	☐ Confirmation that he built it alone, and what dataset he used for the demo
Project 3: Brokely (feature third, label it in development)
One line: A student-first expenditure planning app for Android, with a broccoli mascot that grows from good money habits.
Problem: University students need to plan spending, cover essentials like meals and laundry first, and track money owed between friends, without bank logins or a shaming tone.
His role: Solo developer and product owner (ask Elias to confirm).
Status to state accurately: Release 0.1 is in testing with a first pilot planned at AIU. Importing Touch 'n Go notifications is planned for 0.2 and is not built; do not claim it.
Technical decisions worth a paragraph:
•	Money is stored as whole sen, never floating-point ringgit, with display-only rounding.
•	Every business rule lives in a pure, unit-tested domain package traced to requirement IDs in a written specification.
•	Offline-first: every record is written with a phone-generated ID through an outbox, then synced to a Fastify and PostgreSQL API with idempotent pushes and conflict handling.
•	The API deploys automatically to Azure Container Apps from GitHub Actions.
•	The repository is a pnpm monorepo with separate app, API, domain, contracts and local-database packages.
Stack: React Native, Expo, SQLite, Drizzle, Fastify, PostgreSQL (Supabase), Zod, Vitest, GitHub Actions, Azure Container Apps.
Links: code https://github.com/Elias-717/brokely
Ask Elias for:
•	☐ Screenshots from his phone using synthetic demo data only, never real spending: Home with the mascot, quick add keypad, Insights doughnut chart, Bills, the backup and sync status screen
•	☐ A short screen recording of logging a purchase offline, then syncing
•	☐ The Figma wireframes link and one image of the mascot at each stage
•	☐ Who drew the mascot art, so it is credited correctly
•	☐ An architecture diagram, or permission for the agent to draw one from the repository layout
•	☐ Any anonymised pilot feedback he is happy to quote, and the number of testers
•	☐ A Play Store link, if it exists by launch
Project 4: Sana'a House (front-end showcase)
One line: A bilingual Arabic and English showcase website for a fictional Yemeni artisan atelier, built to demonstrate right-to-left design and front-end craft.
Always label the brand as fictional or a concept project. The six products are modelled on real Yemeni goods, but Sana'a House is not a real business.
His role: Solo designer and developer (ask Elias to confirm).
What it shows:
•	True right-to-left mirroring driven by CSS logical properties, with the locale remembered and Arabic browsers detected on first visit.
•	Locale-aware pricing, such as 7,000 YER in English and Arabic-Indic numerals in Arabic.
•	A scroll-driven parallax hero of the Sana'a skyline and Bab al-Yaman gate.
•	A per-store availability system, an OpenStreetMap store finder, and a validated wholesale inquiry form with spam protection.
•	A lightweight in-app router with no router library, SEO metadata, security headers and a documented content-update workflow.
Stack: React 19, Vite, plain CSS, lucide-react, Formspree, OpenStreetMap, Netlify.
Links: code https://github.com/Elias-717/sanaa_house; live link to be confirmed.
Ask Elias for:
•	☐ The live Netlify URL
•	☐ A screen recording or GIF of the parallax hero
•	☐ Side-by-side screenshots of the same page in English and in Arabic
•	☐ Screenshots of a product page, the stores page with the map, and the contact form
•	☐ Credit and licence details for the photography and illustrations used
•	☐ A Lighthouse score screenshot, if he wants to show performance and accessibility
Leadership, education and certifications
Leadership (confirmed by Elias):
Role	Organisation	Dates	Content to use
Head of Public Relations and Media	Team United	December 2025 to present	Leads communication and issue resolution for charity, education and environmental advocacy campaigns; coordinates diverse international teams of volunteers across cultures and time zones
Maybank #Mbassador 2026	Maybank	April 2026 to present	Selected to represent and promote Maybank's brand initiatives on campus, handling member enquiries and student engagement; builds professional networks through campus events
Education: Bachelor of Computer Science (Data Science), AIU, 2024 to 2027 (expected). Relevant coursework: Data Mining.
Certifications shown on LinkedIn: HTML and CSS for Web Designers: From Basics to Beautiful; Learn HTML and CSS; Learn Accessible Web Design; AI For MY Future; Teaching English as a Second Language.
Ask Elias for:
•	☐ For each certification: the issuer, the date and a credential URL or PDF
•	☐ Team United: two or three campaign photos he has permission to publish, and any numbers (campaigns run, volunteers coordinated, people reached)
•	☐ Maybank #Mbassador: a selection letter or programme page link, and event photos he has permission to publish
•	☐ Any public speaking or debate highlights he wants shown, with a link or photo
•	☐ Permission to publish each photo that shows other people
Open questions to ask before publishing
These claims appear on Elias's older CV but could not be confirmed from his LinkedIn or GitHub. Do not put any of them on the site until he supplies proof or says to leave them out.
Claim	What to ask for
Dean's List, Semester 1 (2024/2025) to present	Official letter or transcript line, and exact wording he wants
AWS AI Practitioner Challenge (Udacity, 2026)	Credential link or certificate PDF
Learn Modern JavaScript (Scrimba, 2026); Build a Simple Calculator in React and JavaScript (Udemy, 2026); CSS and Bootstrap for Absolute Beginners (Udemy, 2025); Become HTML Hero (Udemy, 2025)	Credential links or PDFs for each
Food Ordering E-Commerce Store in PHP and Laravel	Repository link, screenshots and his exact role; the public repo FoodOrder-System-Requirements may be related
Medical Insurance Cost Prediction (Python, linear regression and random forest, AIU group project)	Report or notebook, results, and which parts he built
Rule-based expert system with forward chaining (AIU coursework)	Methodology flowchart or code, if he wants it shown
React Calculator and C++ Digital Clock	Repository links, or leave them out
Coursework in Machine Learning, Expert Systems and Marketing	Confirmation these are completed
Skills PHP, Laravel, Bootstrap, Microsoft Excel, touch typing 60 WPM	Which of these he wants listed
Node.js and Express as top LinkedIn skills	A project that uses them; the only Express repo found is a forked course exercise
Research paper on gamification and data cleaning with data science students	Current status (in progress, submitted, under review, published) and whether he wants it shown
MMC Upstart 2026 Catalyst outcome	Result and permission to state it
Instagram handle on the old CV	Whether to link it
Private repositories (campus-cart-tf, my_portfolio_2026) and public repos not yet reviewed (AIUnity, spicy-dicey, micard, URL-Collector, blog-funfacts-generator, os-assignment, AIU-LMS-Requirements)	Which, if any, belong on an "Other work" section
Rules for the agent
1.	No invented facts. Every number, date, quote, award and screenshot must come from this brief or from Elias. A missing item becomes a visible placeholder and goes on the open list.
2.	Re-check numbers before publishing. Test counts and evaluation figures here come from the repositories' README files; ask Elias to confirm them or re-run the tests.
3.	Credit teammates. Voluntree was a team project; name Khathera Rezaie for the modules she owned and do not present it as solo work. Describe Elias as team lead and developer.
4.	Label status honestly. Voluntree and Insightly are working projects, Brokely is in development with release 0.1 in testing, and Sana'a House is a concept project for a fictional brand.
5.	Synthetic data only. Never publish real student data, real spending data, real notification text, interview notes, API keys or anything from private repositories. Voluntree's evaluation is synthetic and must be described that way.
6.	Permissions. Publish photos of other people, team members' names and organisation logos only with Elias's confirmation.
7.	Be accurate about tools. Some repositories contain AI coding-assistant instruction files and an AI usage log. Ask Elias how he wants to describe AI-assisted development, and make sure he can explain every technical claim on the site in an interview.
8.	Accessibility and speed. Add alt text to every image, keep contrast readable in light and dark modes, avoid autoplaying media, and compress screenshots.
9.	Finish with a handover. End by giving Elias the list of placeholders still open, the unanswered questions, and the pages that are ready.
