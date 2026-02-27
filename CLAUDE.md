# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript compilation + Vite production build (`tsc -b && vite build`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run mock` | Start JSON Server mock API on port 3001 |

For development, run `npm run dev` and `npm run mock` in separate terminals.

## Architecture

React 19 + TypeScript + Vite SPA with feature-based folder structure:

- **src/features/** — Domain feature modules (slices, components, hooks per feature)
- **src/shared/components/** — Reusable components shared across features
- **src/store/store.ts** — Redux Toolkit store with typed `RootState` and `AppDispatch` exports

## Key Libraries

- **State management:** Redux Toolkit + React Redux
- **Forms:** React Hook Form + @hookform/resolvers + Zod for schema validation
- **Data tables:** @tanstack/react-table (headless)
- **Styling:** Tailwind CSS 4 (via @tailwindcss/vite plugin, imported in index.css)
- **Mock API:** json-server serving `db.json` (employees and departments endpoints)

## TypeScript & Linting

- Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- ESLint flat config with typescript-eslint, react-hooks, and react-refresh plugins
- Target: ES2022, module resolution: bundler

## Conventions

- Package manager: npm
- ES modules (`"type": "module"` in package.json)
- `.tsx` for components, `.ts` for non-JSX modules
- Use comments sparingly. Only comment complex code where the logic isn't self-evident.
- When creating a new RTK Query endpoint, always add proper TypeScript types for the response.

## apsys Architecture Rules

- All features go inside `src/features/<feature-name>/`
- Each feature must have the following structure:
  - `data/` — RTK Query API slice
  - `domain/` — TypeScript interfaces and types
  - `presentation/` — React components and pages
- Never mix feature concerns — keep each feature self-contained
- Use RTK Query for ALL server state (no useEffect + fetch)
- Use React Hook Form + Zod for ALL forms
- Shared components go in `src/shared/components/`

## Mock API

- JSON Server running on `http://localhost:3001`
- Endpoints: `/employees`, `/departments`
- Use this base URL in all RTK Query API slices during development

# Always use context7 to check up-to-date docs when implementing or modifying
code that uses RTK Query, React Hook Form, Zod, TanStack Table, or any third-party library.