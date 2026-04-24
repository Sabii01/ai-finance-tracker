import { httpClient } from "@/lib/httpClient";
import { User, AuthResponse } from "@/types/auth";

// Login payload type
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export const AuthApi = {
  // 1. Login: Sends creds to Next.js API Route
  login: (credentials: LoginCredentials) => {
    return httpClient<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  // 2. Logout: Tells server to clear cookies
  logout: () => {
    return httpClient<{ success: true }>("/api/auth/logout", {
      method: "POST",
    });
  },

  // 3. Get Current User: Checks session
  // We will build the endpoint for this in Step 2!
  getMe: () => {
    return httpClient<{ user: User | null }>("/api/auth/me", {
      method: "GET",
      // Important: Ensure we don't cache user data aggressively
      cache: "no-store",
    });
  },

  // 4. Refresh Token (Optional manual call if needed)
  refreshToken: () => {
    return httpClient<{ success: true }>("/api/auth/refresh", {
      method: "POST",
    });
  },

  // 5. Register: Sends creds to Next.js API Route for new users
  register: (credentials: RegisterCredentials) => {
    return httpClient<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
};
