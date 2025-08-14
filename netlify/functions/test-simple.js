const { Pool } = require('pg');

// Prioritize Neon database URLs (auto-provisioned by Netlify)
let connectionString = process.env.NETLIFY_DATABASE_URL || 
                      process.env.NETLIFY_DATABASE_URL_UNPOOLED || 
                      process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('No database connection string found');
}

// Clean connection string for different database providers
// For Neon (via Netlify), no special handling needed - it's optimized for serverless
// For legacy Supabase pooled connections, remove sslmode parameter
if (connectionString.includes('pooler.supabase.com')) {
  connectionString = connectionString.replace('?sslmode=require', '');
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
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Test database connection
    const result = await pool.query('SELECT NOW() as timestamp, version() as version');
    
    // Try to create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        subscription_tier VARCHAR(50) DEFAULT 'free'
      );
    `);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "ok",
        database: "CONNECTED",
        timestamp: result.rows[0].timestamp,
        version: result.rows[0].version.substring(0, 50) + '...',
        message: "Direct PostgreSQL connection successful, users table ready"
      }),
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        database: "ERROR",
        message: error.message,
        timestamp: new Date().toISOString(),
      }),
    };
  }
}; 