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
- Dashboard
  - Loads agents/tasks from APIs
  - Per-agent: Run Demo Task
  - Per-agent: Assign Task input (executes with review)
  - Recent Activity shows outputs and Approve/Reject controls
  - Removed page-level duplicate nav; uses global header

### In Progress / Remaining for MVP
- Execution Engine (background)
  - [ ] Queue + worker (BullMQ + Upstash/Redis) for non-demo tasks
  - [ ] Retry and error reporting
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