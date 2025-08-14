const { Pool } = require('pg');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  // Use same connection logic as test-simple
  let connectionString = process.env.NETLIFY_DATABASE_URL || 
                        process.env.NETLIFY_DATABASE_URL_UNPOOLED ||
                        process.env.DATABASE_URL;

  const pool = new Pool({
    connectionString: connectionString,
    ssl: connectionString?.includes('neon.tech') ? undefined : false,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  try {
    const { name, email, password } = JSON.parse(event.body || '{}');

    if (!name || !email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Missing required fields" }),
      };
    }

    // Just try to insert with minimal fields
    const result = await pool.query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING id, name, email`,
      [name, email, password]
    );

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        message: "User created successfully",
        user: result.rows[0]
      }),
    };

  } catch (error) {
    console.error('Signup error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Internal server error",
        error: error.message,
        code: error.code
      }),
    };
  } finally {
    try {
      await pool.end();
    } catch (e) {
      console.error('Pool cleanup error:', e);
    }
  }
}; 