// Force Prisma to use library engine before importing
process.env.PRISMA_CLIENT_ENGINE_TYPE = "library";
process.env.PRISMA_FORCE_NAPI = "true";
process.env.PRISMA_GENERATE_DATAPROXY = "false";

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
    // Check environment variables
    const envCheck = {
      PRISMA_CLIENT_ENGINE_TYPE: process.env.PRISMA_CLIENT_ENGINE_TYPE,
      PRISMA_FORCE_NAPI: process.env.PRISMA_FORCE_NAPI,
      PRISMA_GENERATE_DATAPROXY: process.env.PRISMA_GENERATE_DATAPROXY,
      DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET",
    };

    // Test database connection
    let dbStatus = "UNKNOWN";
    try {
      await prisma.$connect();
      dbStatus = "CONNECTED";
      await prisma.$disconnect();
    } catch (dbError) {
      dbStatus = `ERROR: ${dbError.message}`;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "ok",
        environment: envCheck,
        database: dbStatus,
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: error.message,
        timestamp: new Date().toISOString(),
      }),
    };
  }
}; 