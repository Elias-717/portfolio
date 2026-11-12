# eliasalsumairi.dev

Portfolio of Elias Al-Sumairi. Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion, with lazy-loaded live demos.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: add your Formspree form ID
npm run dev                  # http://localhost:3000
```

Checks before deploying:

```bash
npm run lint
npm run build
```

## Where things live

- `data/site.ts`: name, pitch, links, resume/headshot/logo paths
- `data/profile.ts`: skills, leadership, education, certifications
- `data/projects.ts`: all project content, demo URLs, posters, videos, screenshots
- `components/DemoFrame.tsx`: poster first; iframe loads only on "Launch live demo" (desktop) or in a full-screen view (mobile)
- `components/DeviceFrame.tsx`: browser and phone mockups
- `public/`: logo, resume, headshot, project images (`public/projects/<slug>/...`)

Search the code for `TODO` to find every missing asset or link.

## Deploy (Vercel)

1. Push to GitHub, then import the repo at vercel.com/new (framework: Next.js, defaults are fine).
2. Add the `NEXT_PUBLIC_FORMSPREE_ID` environment variable in Project → Settings → Environment Variables.
3. Domain: Project → Settings → Domains → add `eliasalsumairi.dev` (and `www.eliasalsumairi.dev`, redirecting to the apex). Set the DNS records Vercel shows at your registrar.
