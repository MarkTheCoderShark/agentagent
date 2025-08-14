import * as Sentry from "@sentry/node";

let inited = false;

export function initSentry(): void {
  if (inited) return;
  const dsn = process.env.SENTRY_DSN || "";
  if (!dsn) return;
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV || "development",
  });
  inited = true;
}

export function captureError(err: unknown, extra?: Record<string, unknown>): void {
  if (!inited) initSentry();
  if (!inited) return;
  Sentry.captureException(err, extra ? { extra } : undefined);
} 