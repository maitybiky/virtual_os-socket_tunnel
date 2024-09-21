import { connectToDatabase } from "@/database";
import { User } from "@/database/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createToken } from "@/util/authorization";
import cookie from "cookie";
export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json(
        { error: new Error("provide both email and password") },
        { status: 500 }
      );

    //checking wheter email exist or not
    let user = await User.findOne({ email });
    if (user)
      return NextResponse.json(
        { error: new Error("User already exists") },
        { status: 503 }
      );
    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    // save user to db
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const accessToken = createToken(email, { expiresIn: "30d" });
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
      { message: "logged in" },
      { headers, status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
