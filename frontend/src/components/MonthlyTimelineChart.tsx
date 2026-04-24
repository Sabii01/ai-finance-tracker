"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { useMonthlyTimelineChart } from "@/hooks/useMonthlyTimelineChart";

export function MonthlyTimelineChart() {
  const { data, isLoading } = useMonthlyTimelineChart();

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading timeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="subscriptionLineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--secondary-400)" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="var(--secondary-400)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="var(--border-light)"
            opacity={0.5}
          />
          <XAxis 
            dataKey="month" 
            stroke="var(--gray-400)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="var(--gray-400)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--surface-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              boxShadow: "var(--shadow-lg)",
              padding: "12px",
            }}
            labelStyle={{
              color: "var(--foreground)",
              fontWeight: 600,
              marginBottom: "8px",
            }}
            itemStyle={{
              color: "var(--foreground)",
              fontSize: "14px",
            }}
          />
          
          {/* Total Spending Area */}
          <Area
            type="monotone"
            dataKey="Total"
            stroke="var(--primary-500)"
            strokeWidth={3}
            fill="url(#totalGradient)"
            animationDuration={1000}
            dot={{ fill: "var(--primary-500)", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          
          {/* Subscription Baseline Line (Optional - shows subscription portion) */}
          <Line
            type="monotone"
            dataKey="Subscriptions"
            stroke="var(--secondary-400)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            animationDuration={1000}
            animationBegin={200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}