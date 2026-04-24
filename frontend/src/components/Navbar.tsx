"use client";

import { useState } from "react";
import NavLinks from "@/components/NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-100 border-b border-border bg-surface/80 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-xl font-display font-bold gradient-text hidden sm:block">
                ExpenseTracker
              </span>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:block">
              <NavLinks />
            </div>
          </div>

          {/* Right side - Theme Toggle & Hamburger */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6 dark:text-gray-500 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  // X icon when open
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger icon when closed
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Slide Down */}
        <div
        className={`md:hidden menu-overlay overflow-hidden transition-all duration-300 ease-in-out ${
    mobileMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
  }`}
        >
          <NavLinks />
        </div>
      </div>
    </nav>
  );
}