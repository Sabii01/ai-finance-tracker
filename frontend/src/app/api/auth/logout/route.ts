// frontend/src/app/api/auth/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh-token")?.value;
  const authToken = cookieStore.get("auth-token")?.value;

  try {
    // Forward cookies to Express for server-side session cleanup
    const cookieHeader = [
      authToken ? `auth-token=${authToken}` : null,
      refreshToken ? `refresh-token=${refreshToken}` : null,
    ]
      .filter(Boolean)
      .join("; ");

    const res = await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
      method: "POST",
      headers: { 
        Cookie: cookieHeader,
        "Content-Type": "application/json"
      },
    });

    const data = await res.json();
    const response = NextResponse.json(data);

    // Forward cookie clearing headers from Express
    const setCookieHeaders = res.headers.getSetCookie();
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie) => {
        response.headers.append("set-cookie", cookie);
      });
    }

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    // Even if backend fails, clear cookies on Next.js side
    const response = NextResponse.json({ message: "Logged out" });
    
    // Clear both cookies
    response.cookies.delete("auth-token");
    response.cookies.delete("refresh-token");
    
    return response;
  }
}