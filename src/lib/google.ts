import { google } from "googleapis";
import { prisma } from "@/lib/prisma";
import { encryptJSON, decryptJSON } from "@/lib/crypto";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || ""; // e.g., https://your.app/api/integrations/google/callback

export function getOAuthClient() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) return null;
  return new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
}

export function getGoogleAuthUrl(scopes: string[]): string | null {
  const client = getOAuthClient();
  if (!client) return null;
  return client.generateAuthUrl({ access_type: "offline", scope: scopes, prompt: "consent" });
}

export async function exchangeCodeForTokens(code: string) {
  const client = getOAuthClient();
  if (!client) throw new Error("Google OAuth not configured");
  const { tokens } = await client.getToken(code);
  return tokens;
}

export async function storeGoogleIntegration(userId: string, tokens: any, scopes: string[]) {
  const encrypted = encryptJSON(tokens);
  return prisma.integration.upsert({
    where: { userId_name: { userId, name: "Google" } as any },
    update: { config: encrypted as any, scopes },
    create: { userId, name: "Google", type: "oauth", config: encrypted as any, scopes },
  } as any);
}

export async function getGoogleOAuthClientForUser(userId: string) {
  const client = getOAuthClient();
  if (!client) throw new Error("Google OAuth not configured");
  const integ = await prisma.integration.findFirst({ where: { userId, name: "Google" } });
  if (!integ) throw new Error("Google not connected");
  const tokens = decryptJSON<any>(integ.config as any);
  client.setCredentials(tokens);
  return client;
}

export async function gmailDraftEmail(userId: string, input: { to: string; subject: string; body: string }) {
  const client = await getGoogleOAuthClientForUser(userId);
  const gmail = google.gmail({ version: "v1", auth: client });
  const raw = Buffer.from(
    `To: ${input.to}\r\nSubject: ${input.subject}\r\nContent-Type: text/html; charset=utf-8\r\n\r\n${input.body}`,
    "utf8"
  ).toString("base64");
  const res = await gmail.users.drafts.create({ userId: "me", requestBody: { message: { raw } } });
  return { id: res.data.id };
}

export async function sheetsAppendRow(
  userId: string,
  input: { spreadsheetId: string; range: string; values: (string | number | boolean | null)[] }
) {
  const client = await getGoogleOAuthClientForUser(userId);
  const sheets = google.sheets({ version: "v4", auth: client });
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: input.spreadsheetId,
    range: input.range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [input.values] as any },
  });
  return { updatedRange: res.data.updates?.updatedRange };
} 