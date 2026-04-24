// frontend/src/app/api/expenses/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * GET /api/expenses
 * Get all expenses with optional filters
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
      ? `${process.env.BACKEND_URL}/expenses?${queryString}`
      : `${process.env.BACKEND_URL}/expenses`;

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
    console.error("Get expenses error:", error);
    return NextResponse.json(
      { message: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/expenses
 * Create a new expense
 */
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/expenses`, {
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
    console.error("Create expense error:", error);
    return NextResponse.json(
      { message: "Failed to create expense" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/expenses?confirm=true
 * Delete all expenses
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
        { message: "Must set confirm=true to delete all expenses" },
        { status: 400 }
      );
    }

    const res = await fetch(`${process.env.BACKEND_URL}/expenses?confirm=true`, {
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
    console.error("Delete all expenses error:", error);
    return NextResponse.json(
      { message: "Failed to delete expenses" },
      { status: 500 }
    );
  }
}