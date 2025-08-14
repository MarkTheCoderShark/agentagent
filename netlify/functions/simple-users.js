const { Pool } = require('pg');

// Same database connection logic as signup function
let connectionString = process.env.NETLIFY_DATABASE_URL || 
                      process.env.NETLIFY_DATABASE_URL_UNPOOLED;

if (!connectionString) {
  connectionString = process.env.DATABASE_URL;
}

let sslConfig;
if (connectionString && connectionString.includes('neon.tech')) {
  sslConfig = undefined; // Let Node.js handle SSL automatically for Neon
} else if (connectionString && connectionString.includes('pooler.supabase.com')) {
  sslConfig = false;
  connectionString = connectionString.replace('?sslmode=require', '');
} else if (connectionString && connectionString.includes('supabase.co')) {
  sslConfig = { rejectUnauthorized: false };
} else {
  sslConfig = undefined;
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: sslConfig,
  max: 5,
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
    console.log('Querying users from database...');
    
    // Query users (without passwords for security)
    const result = await pool.query(`
      SELECT 
        id, 
        name, 
        email, 
        created_at,
        "createdAt",
        subscription_tier, 
        subscription_status
      FROM users 
      ORDER BY COALESCE(created_at, "createdAt") DESC
    `);

    console.log(`Found ${result.rows.length} users`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'success',
        total: result.rows.length,
        users: result.rows.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.created_at || user.createdAt,
          subscriptionTier: user.subscription_tier || 'free',
          subscriptionStatus: user.subscription_status || 'active'
        })),
        timestamp: new Date().toISOString(),
        database: connectionString ? connectionString.split('@')[1]?.split('/')[0] : 'unknown'
      }),
    };

  } catch (error) {
    console.error('Error listing users:', error);
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