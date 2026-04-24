// "use client";

// import { useEffect, useState } from "react";

// export function ThemeToggle() {
//   const [mounted, setMounted] = useState(false);
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     const currentIsDark = document.documentElement.classList.contains("dark");
    
//     setTimeout(() => {
//       setMounted(true);
//       setIsDark(currentIsDark);
//       document.documentElement.classList.add("theme-ready");
//     }, 0);
//   }, []);

//   const toggleTheme = () => {
//     const nextIsDark = !isDark;

//     setIsDark(nextIsDark);
    
//     if (nextIsDark) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   if (!mounted) {
//     return <div className="w-16 h-9 bg-gray-200 dark:bg-gray-700 rounded-full opacity-50" />;
//   }

//   return (
//     <button
//       onClick={toggleTheme}
//       className="group relative w-16 h-9 rounded-full dark:bg-slate-800 transition-all duration-500 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg overflow-hidden"
//       aria-label="Toggle theme"
//     >
//       {/* Subtle glow effect on hover */}
//       <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-amber-200/50 dark:bg-indigo-600/30 blur-md" />
      
//       {/* Toggle circle */}
//       <div
//         className={`absolute top-1 left-1 w-7 h-7 rounded-full dark:bg-gray-200 shadow-xl transform transition-all duration-500 ease-in-out flex items-center justify-center ${
//           isDark ? "translate-x-7" : "translate-x-0"
//         }`}
//       >
//         {/* Inner glow on circle */}
//         <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 dark:from-indigo-400 dark:to-purple-500 opacity-20 dark:opacity-30" />
        
//         {/* Sun Icon */}
//         <svg
//           className={`relative z-10 w-4 h-4 text-yellow-600 transition-all duration-500 ${
//             isDark ? "opacity-0 scale-0 rotate-180" : "opacity-100 scale-100 rotate-0"
//           }`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path
//             fillRule="evenodd"
//             d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
//             clipRule="evenodd"
//           />
//         </svg>

//         {/* Moon Icon */}
//         <svg
//           className={`absolute z-10 w-4 h-4 dark:text-gray-600 transition-all duration-500 ${
//             isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-180"
//           }`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//         </svg>
//       </div>

//       {/* Decorative stars for dark mode */}
//       <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
//         <div className="absolute top-2 right-3 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" />
//         <div className="absolute top-4 right-5 w-0.5 h-0.5 bg-yellow-100 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
//         <div className="absolute top-5 right-2 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
//       </div>
//     </button>
//   );
// }





"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const currentIsDark = document.documentElement.classList.contains("dark");
    
    setTimeout(() => {
      setMounted(true);
      setIsDark(currentIsDark);
      document.documentElement.classList.add("theme-ready");
    }, 0);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    
    if (nextIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Prevent hydration mismatch by showing a placeholder
  if (!mounted) {
    return <div className="w-12 h-6 bg-gray-200 dark:bg-zinc-800 rounded-full opacity-20" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out
        ${isDark ? 'bg-zinc-700' : 'bg-gray-400'}
        /* We use dark: prefix explicitly for your setup */
        dark:bg-zinc-700
      `}
      aria-label="Toggle theme"
    >
      <div
        className={`
          flex items-center justify-center w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ease-in-out
          ${isDark ? 'translate-x-6 bg-zinc-950' : 'translate-x-0 bg-white'}
          dark:bg-zinc-950
        `}
      >
        {isDark ? (
          // Moon Icon
          <svg className="w-2.5 h-2.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          // Sun Icon
          <svg className="w-2.5 h-2.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </button>
  );
}