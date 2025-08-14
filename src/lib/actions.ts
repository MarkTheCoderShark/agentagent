import { gmailDraftEmail, sheetsAppendRow } from "@/lib/google";

export type ActionInput =
  | { name: "gmailDraftEmail"; userId: string; to: string; subject: string; body: string }
  | { name: "sheetsAppendRow"; userId: string; spreadsheetId: string; range: string; values: (string | number | boolean | null)[] };

export async function runAction(input: ActionInput): Promise<any> {
  switch (input.name) {
    case "gmailDraftEmail":
      return gmailDraftEmail(input.userId, { to: input.to, subject: input.subject, body: input.body });
    case "sheetsAppendRow":
      return sheetsAppendRow(input.userId, { spreadsheetId: input.spreadsheetId, range: input.range, values: input.values });
    default:
      throw new Error("Unknown action");
  }
} 