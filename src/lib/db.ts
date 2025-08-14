import { Pool } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    // Prioritize Neon database URLs (auto-provisioned by Netlify)
    let connectionString = process.env.NETLIFY_DATABASE_URL || 
                          process.env.NETLIFY_DATABASE_URL_UNPOOLED || 
                          process.env.DATABASE_URL;
    
    if (!connectionString) {
      throw new Error('No database connection string found. Please set NETLIFY_DATABASE_URL or DATABASE_URL.');
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

    pool = new Pool({
      connectionString,
      ssl: sslConfig,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Handle connection errors
    pool.on('error', (err) => {
      console.error('Database pool error:', err);
    });
  }

  return pool;
}

export async function query(text: string, params?: any[]): Promise<any[]> {
  const client = getPool();
  const result = await client.query(text, params);
  return result.rows;
}

export async function queryOne(text: string, params?: any[]): Promise<any | null> {
  const rows = await query(text, params);
  return rows[0] || null;
}

export async function testConnection(): Promise<boolean> {
  try {
    await query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Initialize database schema
export async function initDatabase(): Promise<void> {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255),
      email_verified TIMESTAMP,
      image VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      subscription_tier VARCHAR(50) DEFAULT 'free',
      subscription_status VARCHAR(50) DEFAULT 'active',
      subscription_end_date TIMESTAMP,
      stripe_customer_id VARCHAR(255) UNIQUE
    );
  `;

  const createAgentsTable = `
    CREATE TABLE IF NOT EXISTS agents (
      id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'active',
      avatar VARCHAR(255),
      tone VARCHAR(50) DEFAULT 'professional',
      working_hours TEXT,
      permissions JSONB,
      tasks_completed_today INTEGER DEFAULT 0,
      tasks_completed_week INTEGER DEFAULT 0,
      efficiency REAL DEFAULT 0,
      last_active TIMESTAMP DEFAULT NOW(),
      memory JSONB,
      user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const createTasksTable = `
    CREATE TABLE IF NOT EXISTS tasks (
      id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      type VARCHAR(50) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      input JSONB,
      output JSONB,
      error TEXT,
      started_at TIMESTAMP,
      completed_at TIMESTAMP,
      duration INTEGER,
      user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      agent_id VARCHAR(255) REFERENCES agents(id) ON DELETE SET NULL,
      workflow_id VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await query(createUsersTable);
    await query(createAgentsTable);
    await query(createTasksTable);
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    throw error;
  }
} 