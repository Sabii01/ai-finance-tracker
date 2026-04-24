// frontend/src/app/api/insights/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * GET /api/insights
 * Get AI-generated spending insights
 */
export async function GET(req: Request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/insights`, {
      method: "GET",
      headers: {
        Cookie: `auth-token=${authToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Get insights error:", error);
    return NextResponse.json(
      { message: "Failed to fetch insights" },
      { status: 500 }
    );
  }
}