# Portfolio TODOs

Everything still missing before (or after) launch. Search the code for `TODO` to find where each one plugs in.

## Launch
- [ ] Push to GitHub and import the repo in Vercel
- [ ] Add the domain `eliasalsumairi.dev` (plus `www`) in Vercel and set the DNS records at the registrar
- [x] Formspree form created (ID `xaeonpqk`, saved in `.env.local`)
- [ ] Add `NEXT_PUBLIC_FORMSPREE_ID=xaeonpqk` in Vercel → Settings → Environment Variables before deploying

## Files to add in `public/`
- [x] Resume added (`public/Elias-Al-Sumairi-Resume.pdf`); download tested

## Voluntree (`public/projects/voluntree/`)
- [x] Poster: homepage capture added (`cover.webp`); swap for a curated screenshot if you like
- [ ] Screenshots: landing, student home with watering gauge, "Why recommended", AI draft, QR attendance, admin fairness chart
- [ ] Screen recording of the core journey (`demo.mp4`)
- [ ] One-click guest URL in the Voluntree app; then set `links.guest`
- [ ] In Voluntree: reset demo data on a schedule and rate-limit Groq drafts for guests
- [ ] If login fails inside the embed: set Supabase auth cookies to `SameSite=None; Secure`

## Insightly (`public/projects/insightly/`)
- [x] Poster: homepage capture added (`cover.webp`)
- [x] Screenshots added (overview, Whispers, charts + heatmap, cleaning before/after, privacy and offline proof, dark mode, mobile)
- [ ] Screen recording of dropping a sample CSV (`demo.mp4`)
- [x] Insightly now allows embedding by the portfolio (insightly PR #9, merged)

## Brokely (`public/projects/brokely/`)
- [ ] Poster (phone screenshot, synthetic data only)
- [ ] Screenshots: Home with mascot, quick add, Insights, Bills, sync status
- [ ] Screen recording: log a purchase offline, then sync (`demo.mp4`)
- [ ] Mascot stage images and an architecture diagram
- [ ] Try `npx expo export -p web`; if it works, deploy and set `demo.url`

## Sana'a House
- [x] Sana'a House now allows embedding by the portfolio (sanaa_house PR #1, merged)
- [ ] Confirm the year (currently 2026)

## About section
- [ ] Add extracurricular activities: music, public speaking, AIU Shop design, identity, AIU VC character, logo, jersey (send details, photos or links for each)

## Experience section
- [ ] Evidence photos for the Experience section: Team United campaigns and Maybank #Mbassador events (only photos you have permission to publish, especially ones showing other people)
- [ ] Selection letter or programme page link for Maybank #Mbassador (optional proof)
- [ ] Add your most important certifications with issuer, date and credential link (`data/profile.ts`)

## Content
- [ ] X / Twitter profile URL (`data/site.ts`)
- [ ] Confirm the LinkedIn URL (brief: `/in/elias-al-sumairi-1b55b5324`; GitHub README: `/in/Elias-Al-Sumairi`)
- [ ] Keep TikTok in the socials, or remove it?
- [ ] Full certification list with issuers and credential links (`data/profile.ts`)
- [ ] Decide on: Dean's List, composting IoT project, research paper (currently left off)
- [ ] Update Voluntree repo's homepage field (`voluntree-nine` vs `joinvoluntree`)
