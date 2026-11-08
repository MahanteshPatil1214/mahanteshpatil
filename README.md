# Mahantesh Patil — Portfolio 2026

An editorial developer portfolio built from scratch. The page moves from a quiet carbon hero into a warm-paper statement, a dense white engineering record, a deep-carbon architecture matrix, and a direct contact footer.

**Stack:** Next.js (App Router) · TypeScript · SCSS · self-hosted fonts (Syne, Inter, JetBrains Mono, Instrument Serif)

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

The site is configured for static export (`output: "export"`) and outputs to `out/`.

## Deploy to GitHub Pages

The workflow in `.github/workflows/static.yml` builds the Next.js app and publishes `out/` to GitHub Pages.

`NEXT_PUBLIC_BASE_PATH` is set automatically to the repository name during the workflow, so project pages resolve correctly at:

```text
https://<user>.github.io/<repo>/
```

For a custom domain or a user site (`<user>.github.io`), remove the `NEXT_PUBLIC_BASE_PATH` env from the workflow (or set it to an empty string) and add your domain in GitHub Pages settings.

## Structure

```text
app/
  components/     Hero, Statement, Work, Stack, Footer, TopBar, Clock, CopyEmail
  data/           case studies, stack layers, terminal stats
  lib/            site constants
  styles/         global tokens, reset, base typography
  layout.tsx      fonts, metadata, JSON-LD
  page.tsx        portfolio entry
public/           portrait and static assets
legacy/           previous single-file version
```

## Design notes

- **Three intentional tones:** `#0e1013` carbon hero, `#f1efe9` warm-paper statement, `#f8f9fa` white case studies, then `#111317` for the architecture matrix and contact footer.
- **Type system:** Syne 700/800 for display, Inter for prose, JetBrains Mono reserved for labels, numbers, timestamps, architecture tags, and terminal data. Instrument Serif is used only for editorial italic accents.
- **No overlays:** case studies are open, tabular records — no modals, hover cards, or text-obscuring layers.
- **Motion:** the hero name has a short load reveal; all motion is disabled under `prefers-reduced-motion: reduce`.
- **Interaction:** the IST clock updates every 15 seconds. Copy-email buttons use the Clipboard API with a hidden-textarea fallback and visible confirmation.

Case-study content lives in `app/data/projects.ts`; architecture layers and terminal stats live in `app/data/stack.ts`.
