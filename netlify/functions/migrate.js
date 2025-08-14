// Force Prisma to use library engine before importing
process.env.PRISMA_CLIENT_ENGINE_TYPE = "library";
process.env.PRISMA_FORCE_NAPI = "true";
process.env.PRISMA_GENERATE_DATAPROXY = "false";

const { Pool } = require('pg');

// Prioritize Neon database URLs (auto-provisioned by Netlify)
let connectionString = process.env.NETLIFY_DATABASE_URL || 
                      process.env.NETLIFY_DATABASE_URL_UNPOOLED || 
                      process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('No database connection string found');
}

// Determine SSL configuration based on provider
let sslConfig;
if (connectionString.includes('neon.tech') || connectionString.includes('netlify')) {
  // Neon handles SSL automatically - use default
  sslConfig = undefined;
} else if (connectionString.includes('pooler.supabase.com')) {
  // Supabase pooled connections don't need SSL
  sslConfig = false;
} else if (connectionString.includes('supabase.co')) {
  // Supabase direct connections need SSL with self-signed cert acceptance
  sslConfig = { rejectUnauthorized: false };
} else {
  // Default for other providers
  sslConfig = undefined;
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: sslConfig,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    console.log('Starting database migration...');

    // Create all required tables
    const migrations = [
      // Users table
      `CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW(),
        subscription_tier VARCHAR(50) DEFAULT 'free',
        subscription_status VARCHAR(50) DEFAULT 'active',
        stripe_customer_id VARCHAR(255)
      );`,

      // Agents table
      `CREATE TABLE IF NOT EXISTS agents (
        id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        instructions TEXT,
        "userId" VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      );`,

      // Workflows table
      `CREATE TABLE IF NOT EXISTS workflows (
        id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        "agentId" VARCHAR(255) NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
        "userId" VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        schedule VARCHAR(255),
        "isActive" BOOLEAN DEFAULT true,
        "lastRunAt" TIMESTAMP,
        "nextRunAt" TIMESTAMP,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      );`,

      // Tasks table
      `CREATE TABLE IF NOT EXISTS tasks (
        id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        result TEXT,
        "agentId" VARCHAR(255) NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
        "workflowId" VARCHAR(255) REFERENCES workflows(id) ON DELETE SET NULL,
        "userId" VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      );`,

      // Integrations table
      `CREATE TABLE IF NOT EXISTS integrations (
        id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        "encryptedTokens" TEXT,
        "userId" VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW(),
        UNIQUE("userId", name)
      );`,

      // Events table (for logging)
      `CREATE TABLE IF NOT EXISTS events (
        id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
        type VARCHAR(255) NOT NULL,
        payload JSONB,
        "userId" VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );`,

      // Create indexes for better performance
      `CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents("userId");`,
      `CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON workflows("userId");`,
      `CREATE INDEX IF NOT EXISTS idx_workflows_agent_id ON workflows("agentId");`,
      `CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks("userId");`,
      `CREATE INDEX IF NOT EXISTS idx_tasks_agent_id ON tasks("agentId");`,
      `CREATE INDEX IF NOT EXISTS idx_tasks_workflow_id ON tasks("workflowId");`,
      `CREATE INDEX IF NOT EXISTS idx_integrations_user_id ON integrations("userId");`,
      `CREATE INDEX IF NOT EXISTS idx_events_user_id ON events("userId");`,
    ];

    // Run all migrations
    for (const migration of migrations) {
      console.log('Running migration:', migration.substring(0, 50) + '...');
      await pool.query(migration);
    }

    console.log('Database migration completed successfully');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Database migration completed successfully',
        tablesCreated: ['users', 'agents', 'workflows', 'tasks', 'integrations', 'events'],
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error('Migration failed:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: 'Migration failed',
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
    };
  } finally {
    await pool.end();
  }
}; 