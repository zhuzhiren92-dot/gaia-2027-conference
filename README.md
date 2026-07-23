# GAIA 2027 Conference Website

A responsive website for the **3rd International Workshop of Geomechanics Alliance In Asia**.

The first release is intentionally content-ready rather than content-final: dates, host information, speakers, fees and official contacts are marked **To be announced** until they are confirmed.

## Pages

- `/` — Home
- `/about` — About GAIA
- `/workshop` — Workshop scope, speakers and venue
- `/registration` — Registration status, steps and fees
- `/program` — Tentative programme framework
- `/previous-gaia` — GAIA 2025 and GAIA 2026
- `/contact` — Contacts and organizations

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

For a production check:

```bash
npm run lint
npm run build
npm run preview
```

## Update conference content

All conference information is centralized in:

```text
src/content/conference.ts
```

Its structure is checked by TypeScript against:

```text
src/types/conference.ts
```

Update the content file to replace placeholders with confirmed dates, host information, speakers, fees, programme items, contact details and organization names. Shared information automatically updates across all seven pages.

## Design and interaction

- React, TypeScript and Vite
- React Router for seven independent URLs
- React Bits-inspired, project-owned carousel, blur reveal and spotlight components
- React Bits Grainient WebGL background powered by `ogl`
- Light-theme React Bits BorderGlow adaptation for interactive content frames
- Mouse, touch and keyboard carousel controls
- Responsive navigation and layouts
- `prefers-reduced-motion` support
- No registration backend, database or personal-data collection
