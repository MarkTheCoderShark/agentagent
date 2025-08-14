import { NextResponse } from "next/server";
import { testConnection, initDatabase } from "@/lib/db";

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "SET" : "NOT SET",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ? "SET" : "NOT SET",
    };

    // Test database connection
    let dbStatus = "UNKNOWN";
    try {
      const isConnected = await testConnection();
      if (isConnected) {
        dbStatus = "CONNECTED";
        // Initialize database schema if needed
        await initDatabase();
      } else {
        dbStatus = "CONNECTION_FAILED";
      }
    } catch (dbError) {
      dbStatus = `ERROR: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`;
    }

    return NextResponse.json({
      status: "ok",
      environment: envCheck,
      database: dbStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
} 