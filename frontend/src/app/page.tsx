"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans no-scrollbar">
      {/* --- Isolated Landing Page Navbar --- */}
      <nav
        className="w-full border-b border-gray-100 fixed bg-gray-200/30
bg-clip-padding
backdrop-filter
backdrop-blur-sm
backdrop-saturate-100
backdrop-contrast-100 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold tracking-tighter">
                FinanceAI
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-black transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition shadow-sm"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button (Hamburger) */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-black focus:outline-none p-2"
              >
                {isMobileMenuOpen ? (
                  // X Icon
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger Icon
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-2">
            <div className="px-4 space-y-2 pb-4">
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2 rounded-md text-base font-medium bg-black text-white hover:bg-gray-800 mt-2"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-24 sm:pt-24">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-6">
            <span className="flex h-2 w-2 relative mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New: AI-Powered Insights
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-gray-900">
            Master your money <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              without the stress.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Stop guessing where your money goes. Our AI analyzes your spending
            habits, detects anomalies, and helps you save effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full px-6">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 text-center text-lg font-bold text-white bg-black rounded-xl hover:bg-gray-800 hover:scale-[1.02] transition-all duration-200 shadow-xl shadow-gray-200"
            >
              Start Tracking Free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 text-center text-lg font-bold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200"
            >
              View Demo
            </Link>
          </div>

          {/* Social Proof / Features */}
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-medium text-gray-500 max-w-3xl mx-auto border-t border-gray-100 mt-12 w-full">
            <div className="flex items-center justify-center gap-2 py-2">
              <div className="bg-green-100 p-1.5 rounded-full text-green-700">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              Smart Categorization
            </div>
            <div className="flex items-center justify-center gap-2 py-2">
              <div className="bg-green-100 p-1.5 rounded-full text-green-700">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              Subscription Alerts
            </div>
            <div className="flex items-center justify-center gap-2 py-2">
              <div className="bg-green-100 p-1.5 rounded-full text-green-700">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              Anomaly Detection
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-100 bg-gray-50">
        <p>© 2024 FinanceAI. Built for smart spenders.</p>
      </footer>
    </div>
  );
}
