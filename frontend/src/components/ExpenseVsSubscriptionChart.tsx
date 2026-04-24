/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useExpenseSubscriptionChart } from "@/hooks/useExpenseSubscriptionChart";

export function ExpenseVsSubscriptionChart() {
  const { data, isLoading } = useExpenseSubscriptionChart();

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="var(--border-light)"
            opacity={0.5}
          />
          <XAxis 
            dataKey="month" 
            stroke="var(--gray-500)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="var(--gray-500)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip
  content={({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-gray-600 bg-gray-100 dark:bg-gray-100 border border-gray-100 p-3 rounded-lg shadow-xl">
          <p className="font-bold text-sm mb-2 text-gray-900 dark:text-gray-500">{label}</p>
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex justify-between gap-4 text-xs py-1">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-mono font-medium text-gray-800">
                ₹{entry.value}
              </span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-600 dark:border-zinc-800">
             <span className="text-[10px] uppercase tracking-wider text-gray-500">
               Status: Aggregated Monthly Burn
             </span>
          </div>
        </div>
      );
    }
    return null;
  }}
/>
          <Bar
            dataKey="Subscriptions"
            fill="url(#subscriptionGradient)"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
            animationBegin={0}
          />
          <Bar
            dataKey="Expenses"
            fill="url(#expenseGradient)"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
            animationBegin={200}
          />
          <defs>
            <linearGradient id="subscriptionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--secondary-500)" stopOpacity={1} />
              <stop offset="100%" stopColor="var(--secondary-600)" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-400)" stopOpacity={1} />
              <stop offset="100%" stopColor="var(--accent-500)" stopOpacity={0.8} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}