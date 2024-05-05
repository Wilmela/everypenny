import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "./lib/comparePassword";

export async function middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("UnAuthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

async function isAuthenticated(req: NextRequest) {
  // Header could return authorization or Authorization
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (authHeader == null) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  // Compare username with the admin username and password with the encrypted password. Should return a boolean value
  return (
    username === (process.env.ADMIN_USERNAME as string) &&
    (await comparePassword(password, process.env.ADMIN_PASSWORD as string))
  );
}

export const config = {
  matcher: "/dashboard/:path*",
};
