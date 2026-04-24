import { cookies } from "next/headers";
import { User } from "@/types/auth";

export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return null;

  try {
    // Call Express directly from the Next.js server
    const res = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
      headers: { 
        // We pass the cookie along so Express can verify it
        Cookie: `auth-token=${token}` 
      },
      next: { revalidate: 0 } // Don't cache this check
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.user; 
  } catch (error) {
    console.error("Error verifying server session:", error);
    return null;
  }
}