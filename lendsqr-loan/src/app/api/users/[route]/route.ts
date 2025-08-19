import { NextResponse } from "next/server";
import { mockUsers } from "@/mocks/mockUsers";
import type { ApiUser } from "@/types/users";

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

export async function GET() {
  // ✅ Check that env variables exist
  if (!API_URL) {
    console.error("❌ Missing environment variable: API_URL");
    return NextResponse.json(
      { error: "API_URL is missing in server environment" },
      { status: 500 }
    );
  }
  if (!API_TOKEN) {
    console.error("❌ Missing environment variable: API_TOKEN");
    return NextResponse.json(
      { error: "API_TOKEN is missing in server environment" },
      { status: 500 }
    );
  }

  try {
    // ✅ If API_URL points to an external backend
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      cache: "no-store", // prevents Next.js from caching responses
    });

    if (!res.ok) {
      console.warn("⚠️ API fetch failed, using mock data:", res.status);
      return NextResponse.json(mockUsers);
    }

    const data: ApiUser[] = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("⚠️ API fetch error, using mock data:", err);
    return NextResponse.json(mockUsers);
  }
}
