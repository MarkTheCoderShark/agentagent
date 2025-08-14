exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Environment variables to check
  const envVars = {
    // Core database settings
    DATABASE_URL: {
      description: "PostgreSQL connection string (should start with postgresql://)",
      required: false
    },
    NETLIFY_DATABASE_URL: {
      description: "Neon database URL (pooled connection)",
      required: false
    },
    NETLIFY_DATABASE_URL_UNPOOLED: {
      description: "Neon database URL (direct connection)",
      required: false
    },
    
    // Authentication
    NEXTAUTH_SECRET: {
      description: "Random string for JWT encryption",
      required: true,
      sensitive: true
    },
    NEXTAUTH_URL: {
      description: "Your site URL (https://aiagentplat.netlify.app)",
      required: true
    },
    
    // Prisma (legacy - can be removed when fully migrated to direct pg)
    PRISMA_CLIENT_ENGINE_TYPE: {
      description: "Should be \"library\"",
      required: false
    },
    PRISMA_FORCE_NAPI: {
      description: "Should be \"true\"",
      required: false
    },
    PRISMA_GENERATE_DATAPROXY: {
      description: "Should be \"false\"",
      required: false
    },
    
    // Optional integrations
    GOOGLE_CLIENT_ID: {
      description: "Google OAuth client ID (optional)",
      required: false
    },
    GOOGLE_CLIENT_SECRET: {
      description: "Google OAuth client secret (optional)",
      required: false,
      sensitive: true
    },
    GOOGLE_REDIRECT_URI: {
      description: "Google OAuth redirect URI (optional)",
      required: false
    },
    
    // Stripe
    STRIPE_SECRET_KEY: {
      description: "Stripe secret key (optional)",
      required: false,
      sensitive: true
    },
    STRIPE_WEBHOOK_SECRET: {
      description: "Stripe webhook secret (optional)",
      required: false,
      sensitive: true
    },
    STRIPE_PRICE_STARTER: {
      description: "Stripe price ID for starter plan (optional)",
      required: false
    },
    STRIPE_PRICE_PRO: {
      description: "Stripe price ID for pro plan (optional)",
      required: false
    },
    STRIPE_PRICE_ENTERPRISE: {
      description: "Stripe price ID for enterprise plan (optional)",
      required: false
    },
    
    // Queue/Redis
    UPSTASH_REDIS_URL: {
      description: "Upstash Redis URL (optional)",
      required: false
    },
    UPSTASH_REDIS_TOKEN: {
      description: "Upstash Redis token (optional)",
      required: false,
      sensitive: true
    },
    
    // Error tracking
    SENTRY_DSN: {
      description: "Sentry DSN for error tracking (optional)",
      required: false
    },
    
    // Encryption
    ENCRYPTION_KEY: {
      description: "Random string for encrypting integration tokens (optional)",
      required: false,
      sensitive: true
    }
  };

  // Check environment variables
  const environment = {};
  const issues = [];

  Object.entries(envVars).forEach(([key, config]) => {
    const value = process.env[key];
    const isSet = Boolean(value);
    
    environment[key] = {
      set: isSet,
      description: config.description,
      value: isSet ? (config.sensitive ? "***HIDDEN***" : value) : null
    };
    
    if (config.required && !isSet) {
      issues.push(`Missing required environment variable: ${key}`);
    }
  });

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: 'ok',
      environment: environment,
      issues: issues,
      timestamp: new Date().toISOString(),
    }, null, 2),
  };
}; 