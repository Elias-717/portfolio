# Portfolio Builder Brief

You are building my personal portfolio website. Follow the phases below in order. Do not start writing code until Phase 3 is approved.

## About the project

- A one-page-plus-project-pages portfolio, inspired by a clean designer-portfolio layout: nav (Projects / About / Contact), hero with name + role, intro, services/skills, projects, testimonials (optional), contact footer.
- I am building 3 projects to showcase, and each must be **usable live in the browser**, not just shown as screenshots:
  1. **One mobile app**
  2. **One web app**
  3. **One regular website**
- Stack: **Next.js (App Router) + TypeScript + Tailwind CSS**, **Motion (Framer Motion)** for animation, deployed on **Vercel**. Project content lives in `data/projects.ts` (no CMS).

## Phase 1: Read my info

1. Look for my info file in the project root. It may be named `ABOUT_ME.md`, `info.md`, `me.md`, or similar. If you cannot find one, ask me for its name or path.
2. Read it fully. Summarize back to me in under 10 bullets what you learned (name, role, skills, projects, links, tone, anything about design preferences).
3. Do not invent facts about me. Anything you are unsure of goes into the Phase 2 questions.

## Phase 2: Interview me (Q&A)

Ask questions in small batches (max 4 at a time) using the AskUserQuestion tool where possible, so I can pick from options or type my own answer. Skip anything my info file already answers clearly. Cover:

**Identity and content**
- Name, title(s) to show in the hero, one-line pitch, short bio (ask if I want first or third person).
- Which sections to include: Intro, Services/Skills, Projects, Testimonials, Experience/Education, Contact. Ask which to drop.
- Do I have real testimonials? If not, omit that section. Never fabricate testimonials, clients, metrics, or quotes.
- Contact details to publish (email, socials, location). Confirm what is safe to make public.

**Each of my 3 projects** (ask separately for the mobile app, web app, and website)
- Name, year, my role, one-paragraph description, key features, tech stack, what problem it solves, results or lessons.
- Live URL (or how it is built if not yet deployed).
- For the web app: does it need login? Can I offer a "Try as guest" / seeded demo account / read-only mode? Which framework and host?
- For the mobile app: what is it built with (React Native/Expo, Flutter, native iOS/Android)? Based on that, decide the embed route:
  - Expo/React Native: web export or Expo Snack embed
  - Flutter: `flutter build web` embed
  - Native: Appetize.io streaming, or a screen-recording fallback if I do not want to use it
- For the website: is its URL framable (`X-Frame-Options` / CSP `frame-ancestors`)? If not, plan for a styled "Open live site" card plus screenshots instead.
- Do I have screenshots, a poster image, or a short screen recording for the fallback?

**Design**
- Mood/tone (minimal, bold, playful, editorial), light/dark/both, accent color, font preference, any reference sites I like.
- Animations: subtle, moderate, or expressive.
- Do I have a logo, headshot, or brand colors to use?

**Practical**
- Domain name (or Vercel subdomain for now), analytics wanted or not, contact form vs mailto link, resume/CV download.

Stop asking when you have enough. Do not ask questions whose answers do not change what you build.

## Phase 3: Plan and approval

Before coding, present a short plan:
- Final sitemap (pages and sections)
- Data model for `data/projects.ts`
- How each of the 3 live demos will be embedded, and any change I must make in my own apps (for example, adding my portfolio domain to `frame-ancestors`, adding a guest/demo mode)
- Open items I still owe you (assets, URLs, copy)

Wait for my approval before building.

## Phase 4: Build

Use this structure unless the plan says otherwise:

```
app/
  layout.tsx
  page.tsx                  # hero, intro, services, projects, (testimonials), contact
  projects/[slug]/page.tsx  # one template for all projects
components/
  DemoFrame.tsx             # poster first, iframe loads only on "Launch live demo" click
  DeviceFrame.tsx           # phone / browser mockup wrapper
  ...
data/projects.ts            # title, slug, year, tags, role, description, demoUrl, demoType, poster, video
public/                     # images and assets
```

Requirements:
- **Live demos:** each project page shows a poster/screenshot first and a "Launch live demo" button. Clicking it loads the iframe (lazy). Put the web app and website in a browser frame and the mobile app in a phone frame.
- **Always provide fallbacks:** an "Open in new tab" link beside every embed, plus a video or screenshot fallback if the iframe is blocked or fails to load.
- **Iframe safety:** use the `sandbox` attribute (`allow-scripts allow-same-origin allow-forms allow-popups`) and set meaningful `title` attributes.
- **Mobile-first and responsive.** Phone-sized frames inside a phone viewport are awkward, so on small screens offer "Open demo" in a new tab, or a full-screen view, instead of a tiny embed.
- **Accessibility:** semantic HTML, alt text, keyboard-reachable demo buttons, visible focus states, `prefers-reduced-motion` respected.
- **Performance and SEO:** use `next/image`, per-page metadata and Open Graph images, no heavy scripts loaded before the demo click.
- **Content integrity:** only use facts from my info file and my interview answers. If something is missing, leave a clearly marked `TODO` placeholder and list it for me. Do not invent content.
- Keep code clean and typed, with small components. Run lint and a production build and fix errors before telling me it is done.

## Phase 5: Handoff

When finished, give me:
1. How to run it locally.
2. How to deploy on Vercel (and connect a custom domain if I chose one).
3. A checklist of changes I must make in my own apps for embedding to work (headers, guest mode, rate limiting, demo data reset).
4. A list of remaining `TODO` placeholders.

## Working rules

- Ask before installing extra dependencies beyond the stack above.
- Make small, reviewable commits if git is initialized.
- If something is ambiguous, ask me instead of guessing.
- Never expose secrets or API keys in client code; use environment variables.
