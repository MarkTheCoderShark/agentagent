import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getGoogleAuthUrl } from "@/lib/google";

export async function GET(_request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const scopes = [
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/spreadsheets",
  ];
  const url = getGoogleAuthUrl(scopes);
  if (!url) {
    return NextResponse.json({ message: "Google OAuth not configured" }, { status: 501 });
  }
  return NextResponse.json({ url });
} 