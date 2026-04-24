// frontend/src/app/api/auth/refresh/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh-token")?.value;
  const authToken = cookieStore.get("auth-token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Forward BOTH cookies to Express backend
    const cookieHeader = [
      authToken ? `auth-token=${authToken}` : null,
      refreshToken ? `refresh-token=${refreshToken}` : null,
    ]
      .filter(Boolean)
      .join("; ");

    console.log('🔄 Calling refresh endpoint');

    const res = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: { 
        Cookie: cookieHeader,
        "Content-Type": "application/json"
      },
    });

    console.log('📡 Refresh response status:', res.status);

    // Try to parse JSON, but handle errors gracefully
    let data;
    const contentType = res.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.error('❌ Refresh returned non-JSON:', text);
      
      return NextResponse.json(
        { message: "Refresh failed" }, 
        { status: res.status || 500 }
      );
    }

    if (!res.ok) {
      console.error('❌ Refresh failed:', data);
      return NextResponse.json(data, { status: res.status });
    }

    const response = NextResponse.json(data, { status: res.status });

    // CRITICAL FIX: Express sends MULTIPLE Set-Cookie headers (one for each cookie)
    // We need to get ALL of them, not just the first one
    const setCookieHeaders = res.headers.getSetCookie();
    
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      console.log('🍪 Setting refreshed cookies:', setCookieHeaders.length);
      // Forward all Set-Cookie headers to the browser
      setCookieHeaders.forEach((cookie) => {
        response.headers.append("set-cookie", cookie);
      });
    } else {
      console.warn('⚠️ No cookies received from refresh endpoint');
    }

    return response;
  } catch (error) {
    console.error("❌ Refresh error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Refresh failed" }, 
      { status: 401 }
    );
  }
} 