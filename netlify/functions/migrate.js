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
      // Drop and recreate users table with correct schema
      `DROP TABLE IF EXISTS users CASCADE;`,
      
      // Users table with correct snake_case columns
      `CREATE TABLE users (
        id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        subscription_tier VARCHAR(50) DEFAULT 'free',
        subscription_status VARCHAR(50) DEFAULT 'active',
        stripe_customer_id VARCHAR(255)
      );`,

      // Create a simple index on email for fast lookups
      `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`,
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