import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query, queryOne, testConnection } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    console.log('🔍 Signup attempt started');
    const body = await request.json();
    const { name, email, password } = body;

    console.log('📧 Email:', email);
    console.log('🏗️ Name:', name);

    // Validation
    if (!name || !email || !password) {
      console.log('❌ Missing required fields');
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 6) {
      console.log('❌ Password too short');
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
    }

    console.log('🔐 Hashing password...');
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('✅ Password hashed successfully');

    console.log('🗄️ Checking for existing user...');
    // Check if user already exists
    const existingUsers = await query(
      `SELECT id FROM users WHERE email = $1`,
      [email.trim().toLowerCase()]
    );

    if (existingUsers.length > 0) {
      console.log('❌ User already exists');
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    console.log('👤 Creating new user...');
    // Create user
    const [user] = await query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING id, name, email, "createdAt", "updatedAt", subscription_tier, subscription_status`,
      [name.trim(), email.trim().toLowerCase(), hashedPassword]
    );

    console.log('✅ User created successfully:', user.id);

    return NextResponse.json({ 
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        subscriptionTier: user.subscription_tier
      }
    }, { status: 201 });

  } catch (error) {
    console.error('💥 Signup error:', error);
    console.error('💥 Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: error && typeof error === 'object' && 'code' in error ? error.code : undefined,
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
} 