/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Color system - Rich & Bold Premium Palette
      colors: {
        // Base colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",

        // Primary - Rich Blue
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          DEFAULT: "var(--primary-600)",
        },

        // Secondary - Deep Violet
        secondary: {
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          DEFAULT: "var(--secondary-600)",
        },

        // Accent - Vibrant Cyan
        accent: {
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
          800: "var(--accent-800)",
          900: "var(--accent-900)",
          DEFAULT: "var(--accent-500)",
        },

        // Neutral grays
        gray: {
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },

        // Semantic colors
        success: {
          DEFAULT: "var(--success)",
          light: "var(--success-light)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          light: "var(--warning-light)",
        },
        error: {
          DEFAULT: "var(--error)",
          light: "var(--error-light)",
        },

        // Border colors
        border: {
          DEFAULT: "var(--border)",
          light: "var(--border-light)",
          hover: "var(--border-hover)",
        },
      },

      // Background images - Rich Gradients
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-success": "var(--gradient-success)",
        "gradient-premium": "var(--gradient-premium)",
        "gradient-ocean": "var(--gradient-ocean)",
        "gradient-sunset": "var(--gradient-sunset)",
        "gradient-overlay": "var(--gradient-overlay)",
        
        // Additional gradients
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // Box shadows - Premium depth system
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        none: "none",
        glow: "var(--shadow-glow)",
        
        // Custom shadows
        "premium": "0 20px 60px -15px rgba(0, 0, 0, 0.3)",
        "premium-lg": "0 30px 80px -20px rgba(0, 0, 0, 0.4)",
        "glow-primary": "0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)",
        "glow-secondary": "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)",
        "glow-accent": "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2)",
      },

      // Typography - Premium font system
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },

      // Spacing - Enhanced scale
      spacing: {
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },

      // Border radius - Premium rounded corners
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // Animation durations
      transitionDuration: {
        400: "400ms",
      },

      // Animation timing functions
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      // Keyframes for custom animations
      keyframes: {
        "page-enter": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },

      // Animations
      animation: {
        "page-enter": "page-enter 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in": "fade-in 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-up": "slide-up 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-down": "slide-down 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in": "scale-in 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        shimmer: "shimmer 1.5s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-subtle": "bounce-subtle 1s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        gradient: "gradient 3s ease infinite",
      },

      // Backdrop blur
      backdropBlur: {
        xs: "2px",
      },

      // Z-index scale
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

export default config;