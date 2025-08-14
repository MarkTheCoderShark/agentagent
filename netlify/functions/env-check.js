exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // List of required environment variables
  const requiredVars = {
    // Database
    DATABASE_URL: 'PostgreSQL connection string (should start with postgresql://)',
    
    // NextAuth
    NEXTAUTH_SECRET: 'Random string for JWT encryption',
    NEXTAUTH_URL: 'Your site URL (https://aiagentplat.netlify.app)',
    
    // Prisma (optional but recommended)
    PRISMA_CLIENT_ENGINE_TYPE: 'Should be "library"',
    PRISMA_FORCE_NAPI: 'Should be "true"',
    PRISMA_GENERATE_DATAPROXY: 'Should be "false"',
    
    // Optional integrations
    GOOGLE_CLIENT_ID: 'Google OAuth client ID (optional)',
    GOOGLE_CLIENT_SECRET: 'Google OAuth client secret (optional)',
    GOOGLE_REDIRECT_URI: 'Google OAuth redirect URI (optional)',
    
    // Optional billing
    STRIPE_SECRET_KEY: 'Stripe secret key (optional)',
    STRIPE_WEBHOOK_SECRET: 'Stripe webhook secret (optional)',
    STRIPE_PRICE_STARTER: 'Stripe price ID for starter plan (optional)',
    STRIPE_PRICE_PRO: 'Stripe price ID for pro plan (optional)',
    STRIPE_PRICE_ENTERPRISE: 'Stripe price ID for enterprise plan (optional)',
    
    // Optional queue
    UPSTASH_REDIS_URL: 'Upstash Redis URL (optional)',
    UPSTASH_REDIS_TOKEN: 'Upstash Redis token (optional)',
    
    // Optional monitoring
    SENTRY_DSN: 'Sentry DSN for error tracking (optional)',
    
    // Optional encryption
    ENCRYPTION_KEY: 'Random string for encrypting integration tokens (optional)',
  };

  const envStatus = {};
  const issues = [];

  for (const [varName, description] of Object.entries(requiredVars)) {
    const value = process.env[varName];
    const isSet = Boolean(value);
    
    envStatus[varName] = {
      set: isSet,
      description,
      value: isSet ? (varName.includes('SECRET') || varName.includes('KEY') || varName.includes('PASSWORD') ? '***HIDDEN***' : value) : null
    };

    // Check for specific issues
    if (varName === 'DATABASE_URL' && isSet) {
      if (!value.startsWith('postgresql://')) {
        issues.push(`DATABASE_URL should start with 'postgresql://', got: ${value.substring(0, 20)}...`);
      }
      if (!value.includes('?sslmode=require')) {
        issues.push('DATABASE_URL should include ?sslmode=require for Supabase');
      }
    }

    if (varName === 'NEXTAUTH_URL' && isSet) {
      if (!value.startsWith('https://')) {
        issues.push('NEXTAUTH_URL should start with https://');
      }
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: 'ok',
      environment: envStatus,
      issues: issues,
      timestamp: new Date().toISOString(),
    }, null, 2),
  };
}; 