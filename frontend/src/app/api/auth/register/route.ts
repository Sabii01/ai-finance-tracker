// frontend/src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    // 1. Forward to Express
    console.log('🚀 Calling backend:', `${process.env.BACKEND_URL}/auth/signup`);
    
    const res = await fetch(`${process.env.BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log('📡 Backend response status:', res.status);

    // 2. Try to parse JSON, but handle errors gracefully
    let data;
    const contentType = res.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      // Backend didn't return JSON - probably an error
      const text = await res.text();
      console.error('❌ Backend returned non-JSON:', text);
      
      return NextResponse.json(
        { message: "Backend error: " + text }, 
        { status: res.status || 500 }
      );
    }

    if (!res.ok) {
      console.error('❌ Backend error:', data);
      return NextResponse.json(data, { status: res.status });
    }

    // 3. Create response with user data
    const response = NextResponse.json(data);
    
    // 4. Forward ALL Set-Cookie headers from Express (auth-token + refresh-token)
    const setCookieHeaders = res.headers.getSetCookie();
    
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      console.log('🍪 Setting cookies:', setCookieHeaders.length);
      setCookieHeaders.forEach((cookie) => {
        response.headers.append("set-cookie", cookie);
      });
    } else {
      console.warn('⚠️ No cookies received from backend');
    }

    return response;
  } catch (error) {
    console.error("❌ Register error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Registration failed" }, 
      { status: 500 }
    );
  }
}