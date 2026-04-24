// frontend/src/app/api/subscriptions/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * GET /api/subscriptions
 * Get all subscriptions with optional filters
 */
export async function GET(req: Request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Forward query params
    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();
    const url = queryString 
      ? `${process.env.BACKEND_URL}/subscriptions?${queryString}`
      : `${process.env.BACKEND_URL}/subscriptions`;

    const res = await fetch(url, {
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
    console.error("Get subscriptions error:", error);
    return NextResponse.json(
      { message: "Failed to fetch subscriptions" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/subscriptions
 * Create a new subscription (also creates first expense)
 */
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/subscriptions`, {
      method: "POST",
      headers: {
        Cookie: `auth-token=${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Create subscription error:", error);
    return NextResponse.json(
      { message: "Failed to create subscription" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/subscriptions?confirm=true
 * Delete all subscriptions
 */
export async function DELETE(req: Request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const confirm = searchParams.get("confirm");

    if (confirm !== "true") {
      return NextResponse.json(
        { message: "Must set confirm=true to delete all subscriptions" },
        { status: 400 }
      );
    }

    const res = await fetch(`${process.env.BACKEND_URL}/subscriptions?confirm=true`, {
      method: "DELETE",
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
    console.error("Delete all subscriptions error:", error);
    return NextResponse.json(
      { message: "Failed to delete subscriptions" },
      { status: 500 }
    );
  }
}