export function StatCard({
  label,
  value,
  trend,
  icon,
}: {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  icon?: "wallet" | "subscription" | "expense" | "active";
}) {
  // Icon components
  const icons = {
    wallet: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
    subscription: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    expense: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    active: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  // Trend indicator colors
  const trendColors = {
    up: "text-error",
    down: "text-success",
    neutral: "text-gray-400 dark:text-gray-500",
  };

  // Gradient backgrounds for icons
  const iconGradients = {
    wallet: "bg-gradient-primary",
    subscription: "bg-gradient-secondary",
    expense: "bg-gradient-accent",
    active: "bg-gradient-success",
  };

  // Helper to format currency if the value is a number
  const formattedValue = typeof value === 'number' 
    ? `₹${value.toLocaleString()}` // Changed ₹ to $
    : value;
  return (
    <div className="premium-card p-6 space-y-4 group relative overflow-hidden">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      
      <div className="relative">
        {/* Header with icon and trend */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div
                className={`w-10 h-10 rounded-xl ${iconGradients[icon]} opacity-60 flex items-center justify-center text-foreground`}
              >
                {icons[icon]}
              </div>
            )}
          </div>
          
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium ${trendColors[trend]}`}>
              {trend === "up" && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {trend === "down" && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {trend === "neutral" && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                </svg>
              )}
            </div>
          )}
        </div>

        {/* Label */}
        <p className="text-sm font-medium text-gray-600 dark:text-gray-500 mb-2">
          {label}
        </p>

        {/* Value */}
        <p className="text-3xl font-bold text-foreground tracking-tight">
          {formattedValue}
        </p>
      </div>
    </div>
  );
}