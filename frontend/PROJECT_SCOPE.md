# CSS Learners Frontend Scope Tracker

This file is the live implementation tracker for the frontend-first build.

## Current Status

- Phase: Frontend scaffolding and UI system
- Architecture baseline: Completed
- Supabase wiring: Pending
- Install/lint/run in terminal: Deferred (per user instruction)

## What Is Done

### Foundation

- Next.js App Router project scaffolded in `frontend`
- Tailwind and global styling configured
- Platform metadata and branded landing page updated

### Core Route Skeleton (Public)

- Platform landing: `/`
- Discipline discovery: `/programs/[discipline_slug]`
- School/program/year/course hierarchy:
  - `/[school]`
  - `/[school]/[program]`
  - `/[school]/[program]/[year]`
  - `/[school]/[program]/[year]/[course]`
- Section routes:
  - `/assignments` and `/assignments/[id]`
  - `/passco` and `/passco/[id]`
  - `/verified-questions` and `/verified-questions/[id]`
  - `/practice` and `/practice/[id]`
  - `/videos`
  - `/breakdown`
  - `/lectures`
  - `/slides`

### Admin and Superadmin Route Skeleton

- `/admin` plus:
  - `/admin/assignments`, `/admin/assignments/new`, `/admin/assignments/[id]`
  - `/admin/passco`, `/admin/passco/new`
  - `/admin/questions/verified`, `/admin/questions/verified/new`
  - `/admin/questions/practice`, `/admin/questions/practice/new`
  - `/admin/content`, `/admin/content/[id]`
  - `/admin/courses`
  - `/admin/lecturers`
  - `/admin/upload`
  - `/admin/years`, `/admin/years/new`
- `/superadmin/schools`
- `/superadmin/content`
- `/superadmin/admins`

### UI System Implemented

- Shared page scaffold component: `src/components/ui/page-shell.tsx`
- Shared badge component: `src/components/ui/status-pill.tsx`
- Route utilities: `src/lib/routes.ts`
- Multiple pages refactored to shared UI primitives for consistent look and feel

## In Progress (This Stage)

- Refactor remaining route pages to shared `PageShell` and richer content cards
- Add top navigation + breadcrumbs component for all public pages
- Add reusable section list cards and empty states

## What Is Left

### Frontend UI Completion

- Apply shared design system to all remaining pages not yet refactored
- Add responsive navbar/footer and unified app-level layout shell
- Add per-page loading states and not-found states

### Data Integration (Next)

- Add Supabase client setup (server and browser)
- Replace static placeholders with real queries for schools/programs/courses/content
- Wire global search UI to backend endpoint
- Implement assignment/solution state rendering from DB models

### Admin Features (Next)

- Build actual forms for create/edit flows
- Add file upload UI with hash/dedup handling
- Add content link-vs-clone action UX
- Add year rollover wizard form logic

### Quality and Delivery

- Run `npm install`, `npm run lint`, `npm run dev`
- Resolve any dependency/install issues in this environment
- Add smoke tests for critical route rendering
- Prepare initial deployment config for Vercel

## Notes

- This tracker should be updated whenever scope status changes.
- Any new implemented route/component should move from "What Is Left" to "What Is Done".
