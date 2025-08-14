// Force Prisma to use library engine before importing
process.env.PRISMA_CLIENT_ENGINE_TYPE = "library";
process.env.PRISMA_FORCE_NAPI = "true";
process.env.PRISMA_GENERATE_DATAPROXY = "false";

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    // Test database connection first
    await prisma.$connect();
    
    // Run database push (safer than migrate deploy for schema changes)
    const { execSync } = require('child_process');
    
    // Set environment variables for the child process
    const env = {
      ...process.env,
      PRISMA_CLIENT_ENGINE_TYPE: "library",
      PRISMA_FORCE_NAPI: "true",
      PRISMA_GENERATE_DATAPROXY: "false"
    };
    
    const result = execSync('npx prisma db push --accept-data-loss', { 
      encoding: 'utf8',
      env: env
    });

    await prisma.$disconnect();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Database schema updated successfully',
        result: result
      }),
    };
  } catch (error) {
    console.error('Migration error:', error);
    
    try {
      await prisma.$disconnect();
    } catch (_) {}

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Migration failed',
        error: error.message 
      }),
    };
  }
}; 