import { connectToDatabase } from "@/database";
import { User } from "@/database/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import cookie from "cookie";
import { createToken, generatecontainerToken } from "@/util/authorization";
import { createErrorBody } from "../../(util)";
export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json(
        { error: "provide both email and password" },
        { status: 500 }
      );

    //checking wheter email exist or not
    let user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "email not found!!!" },
        { status: 404 }
      );
    //verify password
    const { password: hashedPassword } = user;
    const matched = await bcrypt.compare(password, hashedPassword);
    // wrong password
    if (!matched)
      return NextResponse.json({ error: "wrong password!!!" }, { status: 401 });
    // correct password
    const accessToken = createToken(
      { email, _id: user._id },
      { expiresIn: "30d" }
    );

    const socketToken = generatecontainerToken(
      { email, _id: user._id },
      { expiresIn: "7d" }
    );
    const userAgent = req.headers.get("user-agent");
    if (userAgent === "cli") {
      return NextResponse.json(
        { msg: "logged in", socketToken },
        { status: 200 }
      );
    }
    const headers = new Headers();

    headers.append(
      "Set-Cookie",
      cookie.serialize("access-token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      })
    );
    return NextResponse.json(
      { msg: "logged in", socketToken },
      { headers, status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(createErrorBody(error), { status: 500 });
  }
};
