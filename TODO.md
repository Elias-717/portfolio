# Portfolio TODOs

Everything still missing before (or after) launch. Search the code for `TODO` to find where each one plugs in.

## Launch
- [ ] Push to GitHub and import the repo in Vercel
- [ ] Add the domain `eliasalsumairi.dev` (plus `www`) in Vercel and set the DNS records at the registrar
- [ ] Create a Formspree form and set `NEXT_PUBLIC_FORMSPREE_ID` in Vercel (the contact form stays hidden until it is set)

## Files to add in `public/`
- [ ] `resume.pdf`: the download buttons return 404 until it exists

## Voluntree (`public/projects/voluntree/`)
- [x] Poster: homepage capture added (`cover.webp`); swap for a curated screenshot if you like
- [ ] Screenshots: landing, student home with watering gauge, "Why recommended", AI draft, QR attendance, admin fairness chart
- [ ] Screen recording of the core journey (`demo.mp4`)
- [ ] One-click guest URL in the Voluntree app; then set `links.guest`
- [ ] In Voluntree: reset demo data on a schedule and rate-limit Groq drafts for guests
- [ ] If login fails inside the embed: set Supabase auth cookies to `SameSite=None; Secure`

## Insightly (`public/projects/insightly/`)
- [x] Poster: homepage capture added (`cover.webp`)
- [ ] Screenshots (upload, quality score, column profile, charts + heatmap, Whispers, cleaning before/after, dark mode, mobile)
- [ ] Screen recording of dropping a sample CSV (`demo.mp4`)
- [ ] In Insightly: change CSP to `frame-ancestors https://eliasalsumairi.dev` and remove `X-Frame-Options: DENY` (the embed is blank until then)

## Brokely (`public/projects/brokely/`)
- [ ] Poster (phone screenshot, synthetic data only)
- [ ] Screenshots: Home with mascot, quick add, Insights, Bills, sync status
- [ ] Screen recording: log a purchase offline, then sync (`demo.mp4`)
- [ ] Mascot stage images and an architecture diagram
- [ ] Try `npx expo export -p web`; if it works, deploy and set `demo.url`

## Sana'a House
- [ ] Confirm the year (currently 2026)

## Content
- [ ] X / Twitter profile URL (`data/site.ts`)
- [ ] Confirm the LinkedIn URL (brief: `/in/elias-al-sumairi-1b55b5324`; GitHub README: `/in/Elias-Al-Sumairi`)
- [ ] Keep TikTok in the socials, or remove it?
- [ ] Full certification list with issuers and credential links (`data/profile.ts`)
- [ ] Decide on: Dean's List, composting IoT project, research paper (currently left off)
- [ ] Update Voluntree repo's homepage field (`voluntree-nine` vs `joinvoluntree`)
