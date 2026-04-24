// frontend/src/hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AuthApi,
  LoginCredentials,
  RegisterCredentials,
} from "@/app/api/auth.api";
import { useRouter, usePathname } from "next/navigation";

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  // Don't run auth query on login/register pages to prevent infinite loops
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // 1. Get Current User Query (DISABLED on auth pages)
  const { data, isLoading, error } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      console.log("🔍 Calling getMe()");
      return AuthApi.getMe();
    },
    enabled: !isAuthPage, // 🔥 KEY FIX: Don't query on auth pages
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  // 2. Login Mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => AuthApi.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  // 3. Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: AuthApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(["auth-user"], null);
      queryClient.clear();
      router.push("/login");
      router.refresh();
    },
    onError: () => {
      // Even if API call fails, clear local state
      queryClient.setQueryData(["auth-user"], null);
      queryClient.clear();
      router.push("/login");
      router.refresh();
    },
  });

  // 4. Signup Mutation
  const signupMutation = useMutation({
    mutationFn: (credentials: RegisterCredentials) =>
      AuthApi.register(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });

  return {
    user: data?.user ?? null,
    isLoading,
    isError: !!error,

    // Login Stuff
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    login: loginMutation.mutate,

    // Logout Stuff
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,

    // Signup Stuff
    isSigningUp: signupMutation.isPending,
    signupError: signupMutation.error,
    signup: signupMutation.mutate,
  };
}
