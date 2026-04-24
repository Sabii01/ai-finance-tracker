// frontend/src/app/api/expenses/[id]/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * GET /api/expenses/[id]
 * Get a single expense
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;

    const res = await fetch(`${process.env.BACKEND_URL}/expenses/${id}`, {
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
    console.error("Get expense error:", error);
    return NextResponse.json(
      { message: "Failed to fetch expense" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/expenses/[id]
 * Update an expense
 */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/expenses/${id}`, {
      method: "PUT",
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

    return NextResponse.json(data);
  } catch (error) {
    console.error("Update expense error:", error);
    return NextResponse.json(
      { message: "Failed to update expense" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/expenses/[id]
 * Delete an expense
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const res = await fetch(`${process.env.BACKEND_URL}/expenses/${id}`, {
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
    console.error("Delete expense error:", error);
    return NextResponse.json(
      { message: "Failed to delete expense" },
      { status: 500 }
    );
  }
}