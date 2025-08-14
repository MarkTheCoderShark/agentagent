import crypto from "crypto";

const RAW_KEY = process.env.ENCRYPTION_KEY || ""; // recommended: random long string

function getKey(): Buffer {
  // Derive a 32-byte key from the provided string
  const hash = crypto.createHash("sha256").update(RAW_KEY).digest();
  return hash; // 32 bytes
}

export function encryptJSON<T extends object>(data: T): { iv: string; tag: string; payload: string } {
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const plaintext = Buffer.from(JSON.stringify(data), "utf8");
  const enc = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    payload: enc.toString("base64"),
  };
}

export function decryptJSON<T = any>(ciphertext: { iv: string; tag: string; payload: string }): T {
  const key = getKey();
  const iv = Buffer.from(ciphertext.iv, "base64");
  const tag = Buffer.from(ciphertext.tag, "base64");
  const payload = Buffer.from(ciphertext.payload, "base64");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(payload), decipher.final()]);
  return JSON.parse(dec.toString("utf8"));
} 