import crypto from "node:crypto";

export type AdminPayload = {
  email: string;
  iat: number; // issued at (unix seconds)
  exp?: number; // expiration (unix seconds)
};

function b64url(input: Buffer | string) {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function b64urlDecodeToBuffer(input: string) {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = input.replaceAll("-", "+").replaceAll("_", "/") + pad;
  return Buffer.from(b64, "base64");
}

export function signAdminSession(payload: AdminPayload, secret: string) {
  const body = b64url(JSON.stringify(payload));
  const sig = crypto.createHmac("sha256", secret).update(body).digest();
  return `${body}.${b64url(sig)}`;
}

export function verifyAdminSession(token: string, secret: string): AdminPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  if (!body || !sig) return null;

  const expected = crypto.createHmac("sha256", secret).update(body).digest();
  const actual = b64urlDecodeToBuffer(sig);
  if (actual.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(actual, expected)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(b64urlDecodeToBuffer(body)).toString("utf8")) as AdminPayload;
    if (!parsed?.email || !parsed?.iat) return null;
    
    // Kiểm tra token đã hết hạn chưa
    if (parsed.exp && parsed.exp < Math.floor(Date.now() / 1000)) {
      return null; // Token đã hết hạn
    }
    
    return parsed;
  } catch {
    return null;
  }
}

