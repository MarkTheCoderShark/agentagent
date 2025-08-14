import { Pool } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL || '';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    // Clean the DATABASE_URL for pooled connections
    let connectionString = DATABASE_URL;
    
    // Remove sslmode parameter for pooled connections
    if (connectionString.includes('pooler.supabase.com')) {
      connectionString = connectionString.replace('?sslmode=require', '');
    }
    
    // Determine SSL configuration
    const isDirectConnection = DATABASE_URL.includes('db.') && DATABASE_URL.includes('.supabase.co');
    const isPooledConnection = DATABASE_URL.includes('pooler.supabase.com');
    
    let sslConfig;
    if (isPooledConnection) {
      // Pooled connections don't use SSL
      sslConfig = false;
    } else if (isDirectConnection) {
      // Direct connections to Supabase require SSL
      sslConfig = { rejectUnauthorized: false };
    } else if (DATABASE_URL.includes('supabase.co')) {
      // Default for other Supabase connections
      sslConfig = { rejectUnauthorized: false };
    } else {
      // Local or other databases
      sslConfig = undefined;
    }

    pool = new Pool({
      connectionString: connectionString,
      ssl: sslConfig,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
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