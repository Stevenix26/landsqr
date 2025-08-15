// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   // ✅ Replace this with your real authentication logic
//   if (email === "test@example.com" && password === "password123") {
//     const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

//     const res = NextResponse.json({ success: true });

//     // Set cookie
//     res.cookies.set("lendsqr_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       path: "/",
//       maxAge: 60 * 60, // 1 hour
//     });

//     return res;
//   }

//   return NextResponse.json(
//     { success: false, message: "Invalid credentials" },
//     { status: 401 }
//   );
// }
