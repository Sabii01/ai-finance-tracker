import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true, // <--- CRITICAL: Allows sending/receiving cookies
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call backend to refresh token (this will read the refresh cookie)
        await api.post('/auth/refresh'); 
        
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Both tokens dead -> Logout
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);