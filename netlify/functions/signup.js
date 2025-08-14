const { Pool } = require('pg');
// const bcrypt = require('bcryptjs'); // Temporarily disabled for testing

// Prioritize Neon database URLs (auto-provisioned by Netlify)
// Ignore legacy DATABASE_URL if Neon is available
let connectionString = process.env.NETLIFY_DATABASE_URL || 
                      process.env.NETLIFY_DATABASE_URL_UNPOOLED;

// Only fall back to DATABASE_URL if no Neon URLs are available
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

  try {
    const { name, email, password } = JSON.parse(event.body);

    // Validation
    if (!name || !email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Missing required fields" }),
      };
    }

    if (password.length < 6) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Password must be at least 6 characters" }),
      };
    }

    // For testing - use plain text password (NEVER do this in production!)
    const hashedPassword = password + "_hashed"; // Temporary for testing

    // Check if user already exists
    const existingUsers = await pool.query(
      `SELECT id FROM users WHERE email = $1`,
      [email.trim().toLowerCase()]
    );

    if (existingUsers.rows.length > 0) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ message: "User already exists" }),
      };
    }

    // Create user - try different column patterns to handle schema variations
    let user;
    try {
      // Try with snake_case columns first (preferred)
      const result = await pool.query(
        `INSERT INTO users (name, email, password) 
         VALUES ($1, $2, $3) 
         RETURNING id, name, email, subscription_tier`,
        [name.trim(), email.trim().toLowerCase(), hashedPassword]
      );
      user = result.rows[0];
    } catch (error) {
      if (error.code === '42703') {
        // Column doesn't exist, try alternative schema
        try {
          const result = await pool.query(
            `INSERT INTO users (name, email, password) 
             VALUES ($1, $2, $3) 
             RETURNING id, name, email`,
            [name.trim(), email.trim().toLowerCase(), hashedPassword]
          );
          user = result.rows[0];
        } catch (innerError) {
          throw new Error(`Schema mismatch: ${innerError.message}`);
        }
      } else {
        throw error;
      }
    }

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          subscriptionTier: user.subscription_tier || 'free'
        }
      }),
    };

  } catch (error) {
    console.error('Signup error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Internal server error",
        error: error.message
      }),
    };
  }
}; 