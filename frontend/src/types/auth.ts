export interface User {
  id: string;
  email: string;
  name: string;
  role?: "admin" | "user"; // flexible for later
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
  refreshToken?: string; // Optional because sometimes we just return user info
}

export interface LoginCredentials {
  email: string,
  password: string,
  name?: string | undefined
}

export interface RegisterCredentials {
  email: string,
  password: string
  name? : string | undefined
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}