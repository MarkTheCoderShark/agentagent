## AgentForce MVP Development Status

Last updated: current sprint

### Completed
- UI/Navigation
  - Global header with transparent-to-oval on scroll, single nav across pages
  - Home, Features, How it Works, Pricing, About, Contact pages aligned to brand
  - shadcn/ui + Tailwind design system
- Auth & Data
  - NextAuth (Credentials + Google), JWT sessions, Prisma adapter
  - Prisma models: `User`, `Agent`, `Workflow`, `Task`, `Integration`
  - Prisma client singleton hardened
- Onboarding & Core Flows
  - Multi-step onboarding → first agent creation
  - “Hire Agent” flow with role templates; server creates agent with memory
  - Agents API: `POST /api/agents` (auto-creates welcome task), `GET /api/agents`
- Tasks & Execution (LLM-backed demo + review loop)
  - `POST /api/tasks` creates tasks
    - `type: "demo"` executes immediately via LLM and completes
    - `execute: true` runs via LLM and marks `needs_review`
  - `GET /api/tasks` lists tasks (with agent name/role)
  - `PATCH /api/tasks/[id]` updates status (approve/reject)

### In Progress / Remaining for MVP
- Execution Engine (background)
  - [x] Queue scaffold (BullMQ + Upstash/Redis envs) + worker script
  - [x] `POST /api/tasks`: enqueue non-demo `execute` when queue configured, else fallback inline
  - [ ] Retry and error reporting (expand), job metadata
- Integrations (first 1–2 end-to-end)
  - [ ] Google OAuth connect; encrypted token storage in `Integration.config`
  - [ ] Actions: Gmail draft email; Google Sheets append row
- Workflows (starter templates)
  - [ ] Role-based templates (2–3 each) with manual run + cron schedule
  - [ ] API/UI to enable/disable templates per agent
- Billing & Plans
  - [ ] Stripe Checkout + Customer Portal
  - [ ] Webhooks for provisioning entitlements (agent limits, plan tier)
  - [ ] Enforce limits in UI/API
- Analytics & ROI
  - [ ] Real metrics in dashboard from `Task` data (time saved, cost savings)
- Production Readiness
  - [ ] Postgres provisioning + Prisma migrations + seed
  - [ ] Error tracking (Sentry), basic rate limiting, audit logging
  - [ ] Account hygiene: password reset; legal pages (Privacy/Terms)

### Immediate Next (priority order)
1. Add job queue + worker to execute tasks off-thread (keeps API responsive)
2. Google OAuth + Gmail Draft action (first real integration)
3. Stripe billing (plans, webhooks, entitlements)
4. Workflow templates (enable/run/schedule) for first roles

### Environment Notes
- `OPENAI_API_KEY` optional; when absent, LLM returns safe fallback text for demo/execute flows.
- Ensure `DATABASE_URL` set for Prisma; run migrations before deploying. 

## Next Sprint Plan (Billing, Agents, Tasks & Integrations)

### Billing & Plans
- [ ] Stripe setup
  - [x] Add `src/lib/stripe.ts` (Stripe SDK init) and env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_STARTER`, `STRIPE_PRICE_PRO`, etc. (init added; envs pending)
  - [x] API: `POST /api/billing/checkout` → creates Checkout Session by `plan` (starter|pro|enterprise) + mode (subscription), returns `url` (skeleton with pricing fallback). Includes user metadata and uses stored `stripeCustomerId` when present.
  - [x] API: `GET /api/billing/portal` → creates Billing Portal Session (uses/stores `stripeCustomerId` as needed; fallback to pricing otherwise)
  - [x] Webhook: `src/app/api/webhooks/stripe/route.ts` → skeleton validates signature and updates user subscription fields on events; backfills `stripeCustomerId`
  - [x] Update `src/app/pricing/page.tsx` buttons to hit Checkout (if not signed-in, redirect to `/auth/signin?next=/pricing&plan=pro`)
  - [x] Entitlements: enforce limits in APIs (initial)
    - [x] `POST /api/agents` → cap number of agents by tier (free: 1, starter: 3, pro: 10, enterprise: unlimited)
    - [x] `POST /api/tasks` → cap monthly tasks by tier (free: 200, starter: 1k, pro: 5k, enterprise: unlimited)
    - [ ] Add helpers in `src/lib/utils.ts` to compute allowances + current usage (query `Task` count for current month) [partially added, refine as Track A evolves]
  - [x] Extend session payload with subscription fields (tier/status/end).
  - [ ] Migration pending: add `stripeCustomerId` to `users` table in DB (blocked locally without `DATABASE_URL`).

### Signup & Onboarding Flow
- [x] Credentials signup → auto-login and redirect to `/onboarding` (after successful `/api/auth/signup`, call `signIn('credentials')` on the client)
- [ ] Optional plan step: if user not subscribed and starts paid feature, prompt to upgrade (guard routes/components)
- [ ] Keep Google sign-up callback to `/onboarding`

### Agents (MVP complete + settings)
- [x] API: `PATCH /api/agents/[id]` to update `name`, `role`, `description`, `tone`, `permissions`, `workingHours`
- [x] UI: Agent Settings drawer in Dashboard (edit name/role/description/tone/status/avatar) wired to PATCH
- [ ] Display memory capabilities and recent performance metrics on per-agent card

### Task Execution Engine (queue + async)
- [x] Queue: BullMQ + Upstash Redis scaffold
  - [x] `src/lib/queue.ts` for queue and job types
  - [x] `scripts/worker.ts` Node worker (LLM execution, mark `needs_review`, record failures)
  - [x] Update `POST /api/tasks`: enqueue non-demo tasks, set `in_progress` (fallback inline when queue missing)
  - [ ] Add retry/backoff and error handling; on failure mark `status: failed`, set `error`
- [ ] UI: Realtime-ish refresh (polling or SSE later) for task rows

### Dashboard & UX
- [x] Agents list: quick actions (Run Demo, Assign Task, Settings)
- [x] Tasks list: status chips, Approve/Reject (already supported via `PATCH /api/tasks/[id]`)
- [ ] Empty states and error toasts wired to API responses
- [x] Pricing CTAs: wire buttons to call checkout endpoint (auth-aware). If unauthenticated, redirect to `/auth/signin?next=/pricing&plan=<plan>`.
- [x] Dashboard: Add "Manage Billing" button → calls portal endpoint when authenticated.
- [x] Plan gating (UI): Show upgrade modal on `Hire Agent` when free-tier user already has 1 agent; Upgrade routes to checkout/pricing.
- [x] Sign-in: respect `next` param to return users to the intended page after authentication.
- [x] Usage API: `GET /api/usage` returns tier, agent/task usage; dashboard shows plan badge and usage limits.
- [x] Dashboard gating: prevent hiring beyond free limit and assigning tasks past monthly cap; show upgrade modal with checkout.
- [x] Unit tests: entitlement helpers (`src/lib/utils.test.ts`) passing with vitest.

### Analytics & Reliability
- [ ] Basic event logging (task created/completed, agent created)
- [ ] Error reporting (Sentry) and API rate limits on write endpoints

### Definition of Done
- Billing: users can purchase plans, portal available, entitlements enforced in API/UI
- Agents: create, edit, view metrics; first agent created via onboarding
- Tasks: demo executes inline; non-demo enqueued and processed by worker; approve/reject flows
- Integrations: connect Google, run Gmail draft + Sheets append end-to-end from a task or workflow 

## Two-Agent Work Allocation (Parallel Tracks)

### Track A — Assistant (You/GPT) [Owner: Assistant]
- [ ] Billing & Plans (Backend)
  - [x] Create `src/lib/stripe.ts`; validate env on boot; safe errors in dev
  - [x] `POST /api/billing/checkout` and `GET /api/billing/portal` (skeletons)
  - [x] Webhook `src/app/api/webhooks/stripe/route.ts` skeleton (signature validation + user subscription updates)
  - [ ] Entitlements middleware/helpers; enforce in `POST /api/agents`, `POST /api/tasks`
  - [ ] Unit tests for entitlement logic and webhook handlers
- [x] Agents API
  - [x] `PATCH /api/agents/[id]` to update profile, tone, permissions, working hours
  - [ ] Server-side validations and audit fields
- [ ] Task Execution Engine
  - [ ] `src/lib/queue.ts` (BullMQ + Upstash); job types for task execution
  - [ ] `scripts/worker.ts` processes jobs (LLM + integrations), retries/backoff, failure recording
  - [ ] Update `POST /api/tasks` to enqueue non-demo tasks, set `in_progress`
- [ ] Integrations (Backend)
  - [ ] Google OAuth flow (callback handler), encrypt tokens in `Integration.config`
  - [ ] Action modules: `gmailDraftEmail`, `sheetsAppendRow`
  - [ ] Simple action router used by worker with input validation
- [ ] Workflows (Backend)
  - [ ] Template schema + seed role templates
  - [ ] API: enable/disable per agent; manual run endpoint that enqueues jobs
  - [ ] Schedule runner (cron) → enqueues according to `schedule`
- [ ] Analytics & Reliability
  - [ ] Add Sentry; add rate limits on write endpoints
  - [ ] Basic event logging for agent/task lifecycle
- [ ] Documentation
  - [ ] API reference (endpoints, params, examples)
  - [ ] Env/ops runbook (Stripe, Upstash, webhooks, worker) 