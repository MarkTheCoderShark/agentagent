const { Pool } = require('pg');

// Same database connection logic as our other functions
let connectionString = process.env.NETLIFY_DATABASE_URL || 
                      process.env.NETLIFY_DATABASE_URL_UNPOOLED;

if (!connectionString) {
  connectionString = process.env.DATABASE_URL;
}

if (!connectionString) {
  throw new Error('No database connection string found');
}

// Clean connection string for different database providers
if (connectionString.includes('pooler.supabase.com')) {
  connectionString = connectionString.replace('?sslmode=require', '');
}

// Determine SSL configuration based on provider
let sslConfig;
if (connectionString.includes('neon.tech')) {
  // Neon - let Node.js handle SSL automatically
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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    // Query all users (without passwords for security)
    const result = await pool.query(`
      SELECT 
        id, 
        name, 
        email, 
        created_at,
        "createdAt",
        subscription_tier, 
        subscription_status,
        "updatedAt"
      FROM users 
      ORDER BY COALESCE(created_at, "createdAt") DESC
    `);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'success',
        users: result.rows,
        total: result.rows.length,
        timestamp: new Date().toISOString(),
        connectionInfo: {
          host: connectionString.includes('neon.tech') ? 'Neon' : 
                connectionString.includes('supabase') ? 'Supabase' : 'Other',
          ssl: sslConfig
        }
      }),
    };

  } catch (error) {
    console.error('List users error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'error',
        message: 'Failed to list users',
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
    };
  }
}; 