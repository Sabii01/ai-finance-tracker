// frontend/src/lib/httpClient.ts
import { ApiError } from "@/types/auth";

const NEXT_PUBLIC_API_URL = ""; 

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Queue requests while refresh is happening
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

// Notify all queued requests that refresh is complete
function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// Check if we're on an auth page (to prevent redirect loops)
function isAuthPage(): boolean {
  if (typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/login' || pathname === '/register';
}

export async function httpClient<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const config: RequestInit = {
    ...options,
    credentials: "include", // CRITICAL: Send cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Handle 204 No Content
    if (response.status === 204) return {} as T;

    // Handle 401 Unauthorized
    if (response.status === 401 && !url.includes('/auth/refresh') && !url.includes('/auth/login')) {
      
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise<T>((resolve, reject) => {
          subscribeTokenRefresh(async () => {
            try {
              const retryResponse = await fetch(url, config);
              const data = await retryResponse.json().catch(() => ({}));
              
              if (!retryResponse.ok) {
                reject({
                  status: retryResponse.status,
                  message: data.message || "Request failed after refresh",
                } as ApiError);
              }
              
              resolve(data as T);
            } catch (error) {
              reject(error);
            }
          });
        });
      }

      // Start refresh process
      isRefreshing = true;

      try {
        const refreshRes = await fetch('/api/auth/refresh', {
          method: "POST",
          credentials: "include",
        });

        if (refreshRes.ok) {
          isRefreshing = false;
          onRefreshed("refreshed"); // Notify queued requests
          
          // Retry the original request
          const retryResponse = await fetch(url, config);
          const data = await retryResponse.json().catch(() => ({}));
          
          if (!retryResponse.ok) {
            throw {
              status: retryResponse.status,
              message: data.message || "Request failed after refresh",
            } as ApiError;
          }
          
          return data as T;
        } else {
          // Refresh failed - redirect to login ONLY if not already on auth page
          isRefreshing = false;
          refreshSubscribers = [];
          
          if (!isAuthPage()) {
            window.location.href = '/login';
          }
          
          throw {
            status: 401,
            message: "Session expired. Please log in again.",
          } as ApiError;
        }
      } catch (error) {
        isRefreshing = false;
        refreshSubscribers = [];
        throw error;
      }
    }

    // Parse response
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || "Something went wrong",
        errors: data.errors,
      } as ApiError;
    }

    return data as T;
  } catch (error) {
    if ((error as ApiError).status) throw error;
    throw { status: 500, message: "Network Error" } as ApiError;
  }
}