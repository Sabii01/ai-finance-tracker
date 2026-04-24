// frontend/src/app/api/subscriptions/[id]/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * GET /api/subscriptions/[id]
 * Get a single subscription
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
    const { id } = await params;

    const res = await fetch(`${process.env.BACKEND_URL}/subscriptions/${id}`, {
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
    console.error("Get subscription error:", error);
    return NextResponse.json(
      { message: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/subscriptions/[id]
 * Update a subscription
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
const { id } = await params;
    const body = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/subscriptions/${id}`, {
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
    console.error("Update subscription error:", error);
    return NextResponse.json(
      { message: "Failed to update subscription" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/subscriptions/[id]
 * Delete a subscription
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

    const res = await fetch(`${process.env.BACKEND_URL}/subscriptions/${id}`, {
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
    console.error("Delete subscription error:", error);
    return NextResponse.json(
      { message: "Failed to delete subscription" },
      { status: 500 }
    );
  }
}