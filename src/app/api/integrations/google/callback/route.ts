import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { exchangeCodeForTokens, storeGoogleIntegration } from "@/lib/google";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(new URL("/dashboard?error=missing_code", request.url));
  }
  try {
    const tokens = await exchangeCodeForTokens(code);
    const scopesParam = url.searchParams.get("scope") || "";
    const scopes = scopesParam.split(" ").filter(Boolean);
    await storeGoogleIntegration(session.user.id, tokens, scopes);
    return NextResponse.redirect(new URL("/dashboard?google=connected", request.url));
  } catch (_err) {
    return NextResponse.redirect(new URL("/dashboard?google=error", request.url));
  }
} 