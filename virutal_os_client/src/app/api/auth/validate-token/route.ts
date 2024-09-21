import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "Secret key not found!" },
      { status: 500 }
    );
  }

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const validToken = jwt.verify(token, secret);
    console.log("verified");
    return NextResponse.json(
      { valid: true, user: validToken },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
