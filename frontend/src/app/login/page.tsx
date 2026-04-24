/* eslint-disable @typescript-eslint/no-explicit-any */

// frontend/src/app/login/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "next/dist/server/api-utils";
import { useState } from "react";

export default function LoginPage() {
  const { login, isLoggingIn, loginError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Helper to get field-specific error
  const getFieldError = (fieldName: string) => {
    if (!loginError?.errors) return null;
    return loginError.errors.find(
      (err: ApiError) => err.field === `body.${fieldName}`
    )?.message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-sm border rounded-xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your AI-powered finance tracker</p>
          </div>
          
          {/* General error message */}
          {loginError && (
            <div className="p-4 mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r">
              <p className="font-medium">{loginError.message}</p>
              
              {/* Show all errors if there are multiple */}
              {loginError.errors && loginError.errors.length > 1 && (
                <ul className="mt-2 space-y-1">
                  {loginError.errors.map((err: ApiError, index: any) => (
                    <li key={index} className="text-xs">• {err.message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                className={`w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-black outline-none transition ${
                  getFieldError("email") ? "border-red-500" : "border-gray-200"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {getFieldError("email") && (
                <p className="mt-1 text-xs text-red-600">{getFieldError("email")}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                className={`w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-black outline-none transition ${
                  getFieldError("password") ? "border-red-500" : "border-gray-200"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {getFieldError("password") && (
                <p className="mt-1 text-xs text-red-600">{getFieldError("password")}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full mt-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition-all"
          >
            {isLoggingIn ? "Authenticating..." : "Login"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Do not have an account? <a href="/register" className="text-black font-bold hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}