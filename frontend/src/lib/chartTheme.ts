export const chartTheme = {
  light: {
    grid: "#e5e7eb",
    axis: "#6b7280",
    tooltipBg: "#ffffff",
    tooltipText: "#111827",
    sub: "#6366f1",
    exp: "#22c55e",
  },
  dark: {
    grid: "#1f2937",
    axis: "#9ca3af",
    tooltipBg: "#0b0f19",
    tooltipText: "#e5e7eb",
    sub: "#818cf8",
    exp: "#4ade80",
  },
};

export const isDark = () =>
  document.documentElement.classList.contains("dark");