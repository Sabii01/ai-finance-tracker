"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import Link from "next/link";
import { ApiError } from "next/dist/server/api-utils";

export default function RegisterPage() {
  const { signup, isSigningUp, signupError } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Helper to get field-specific error
  const getFieldError = (fieldName: string) => {
    if (!signupError?.errors) return null;
    return signupError.errors.find(
      (err: ApiError) => err.field === `body.${fieldName}`
    )?.message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Start tracking your finances with AI
            </p>
          </div>

          {/* General error message */}
          {signupError && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r">
              <p className="font-medium">{signupError.message}</p>

              {/* Show all errors if there are multiple */}
              {signupError.errors && signupError.errors.length > 1 && (
                <ul className="mt-2 space-y-1">
                  {signupError.errors.map((err: ApiError, index: any) => (
                    <li key={index} className="text-xs">
                      • {err.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Username
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 ease-in-out ${
                  getFieldError("name") ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              {getFieldError("name") && (
                <p className="mt-1 text-xs text-red-600">
                  {getFieldError("name")}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 ease-in-out ${
                  getFieldError("email") ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              {getFieldError("email") && (
                <p className="mt-1 text-xs text-red-600">
                  {getFieldError("email")}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="text-xs text-gray-500 mt-1">
              Password must contain:
              <ul className="list-disc list-inside mt-1">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character (@$!%*?&#)</li>
              </ul>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 ease-in-out ${
                  getFieldError("password")
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                minLength={6}
              />
              {getFieldError("password") && (
                <p className="mt-1 text-xs text-red-600">
                  {getFieldError("password")}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full py-3.5 px-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-6"
            >
              {isSigningUp ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-black hover:underline hover:text-gray-800 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
