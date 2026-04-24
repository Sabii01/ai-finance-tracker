// frontend/src/app/api/auth/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
      headers: { 
        Cookie: `auth-token=${token}`,
        "Content-Type": "application/json"
      },
      cache: "no-store", // Don't cache user data
    });

    const data = await res.json();
    
    if (!res.ok) {
      // If backend returns 401, it means token is invalid/expired
      return NextResponse.json({ user: null }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Get me error:", error);
    const message =
      error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";
    return NextResponse.json({ user: null, message }, { status: 401 });
  }
}