<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hireloop Client

Next.js 16 App Router client with React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Better Auth, and MongoDB. The repo is a small starter with only auth, theming, and a button component wired up.

## Commands

- `npm run dev` — dev server at http://localhost:3000.
- `npm run lint` — ESLint flat config. Single file: `npx eslint app/page.tsx`.
- `npm run typecheck` — `tsc --noEmit`.
- `npm run build` — production build.
- `npm run format` — Prettier over `**/*.{ts,tsx}` only. Single file: `npx prettier --write <file>`.
- Verify changes with `npm run lint && npm run typecheck && npm run build`.
- No test suite, test runner, CI, or pre-commit hooks are configured. Don't invent `npm test`.

## Setup

- `.env` is gitignored. It needs `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`; Google sign-in also needs `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (currently absent).
- `lib/auth.ts` hardcodes MongoDB at `mongodb://localhost:27017`, database `hireloopdb`. Start a local MongoDB before exercising auth.
- Better Auth is mounted at `app/api/auth/[...all]/route.ts`; browser helpers live in `lib/auth-client.ts`.

## Conventions and gotchas

- All routes live in `app/` (App Router, no `src/` or `pages/`). Shared code is in `lib/` and `hooks/`; shadcn-generated components are in `components/ui/`.
- `@/*` maps to the repo root, e.g. `@/lib/auth`, `@/components/ui/button`.
- shadcn is configured for the `base-nova` style using `@base-ui/react`, not Radix. Don't replace generated primitives with Radix equivalents. Add components with `npx shadcn@latest add <name>`.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`. Theme tokens and dark-mode styles live in `app/globals.css`.
- `cn` is re-exported from the `cn` npm package in `lib/utils.ts`; generated components may import it from `"cn"` directly. Don't replace it with clsx/tailwind-merge.
- Prettier: no semicolons, double quotes, 80 columns, LF endings, and Tailwind class sorting for `cn`/`cva`. Run it before finishing.
- Theme is class-based via `next-themes` in `components/theme-provider.tsx`; pressing `d` toggles dark mode outside form fields.
- Design assets currently live in `app/images/`; `public/` is empty.
- `CLAUDE.md` only imports this file, so keep `AGENTS.md` canonical. Never remove the Next.js-managed block above; `next dev` only rewrites content between its markers.
