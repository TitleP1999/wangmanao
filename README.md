# Wangmanao corporate website

Thai corporate website built with Next.js App Router, React and TypeScript. Navy / gray / white visual system, responsive layouts, accessible navigation, automatic crossfade hero transitions with pause controls, scroll reveals and product category filtering.

## Development

```sh
npm ci
npm run dev
```

Visit http://localhost:3000. Verify with `npm run typecheck` and `npm run build`.

## Structure

```text
src/app/                 Routes, metadata, global design tokens
src/components/layout/  Shared navigation and footer
src/components/ui/      Reusable presentation primitives
src/features/home/      Home-specific interactive hero
src/features/products/  Catalog interaction
src/content/            Typed public company information
public/images/          Local assets, no production image hotlinking
docs/                   Deployment and content review notes
```

Keep page composition in `app`, reusable presentation in `components`, domain interactions in `features`, and business facts in `content`. Server components are the default; only interaction boundaries use client components. Product administration uses authenticated server routes and Neon Postgres on Vercel and local JSON storage during development.

## Deploy

On Vercel, connect Neon Postgres and configure `DATABASE_URL`. For a dedicated Node.js server, run `npm run build` and `npm start` with persistent storage. Configure admin credentials using `.env.example` and open `/admin/` to edit products. See [deployment guide](docs/deployment.md).

## Content

Source: https://www.wangmanao.com/ and its About Us page, accessed 1 October 2026. The original website supplies company history, contacts, categories and partner logos. Hero farmland photo is illustrative stock photography from Unsplash, not a company location. Company banner and product photography are reused from the client's public website for this draft. Confirm asset rights and current information before public launch. Partner section represents brands displayed on the existing website, not invented customer endorsements. See [content checklist](docs/content-review.md).


