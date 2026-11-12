# Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS + Motion, with live, lazy-loaded demos of my projects.

## Setup

```bash
npm install
npm run dev
```

## Working with Claude Code

1. Fill in `ABOUT_ME.md`.
2. Open this folder in Claude Code and tell it to start. It follows `CLAUDE.md`: reads your info, interviews you, presents a plan, then builds.

## Structure

- `app/` pages (home, `projects/[slug]`)
- `components/DemoFrame.tsx` poster first, iframe loads on click
- `components/DeviceFrame.tsx` phone / browser mockups
- `data/projects.ts` project content (all `TODO` for now)

## Deploy

Push to GitHub, import the repo in Vercel, deploy.
