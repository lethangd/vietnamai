export function getAdminEnv() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!email || !password || !secret) {
    throw new Error(
      "Thiếu ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_SESSION_SECRET trong env"
    );
  }

  return { email, password, secret };
}

