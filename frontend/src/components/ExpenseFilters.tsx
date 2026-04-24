
"use client";

type Props = {
  onChange: (filters: { category?: string; status?: string }) => void;
};

export function ExpenseFilters({ onChange }: Props) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 md:p-5 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Category Filter */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select 
            onChange={(e) => onChange({ category: e.target.value || undefined })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground font-medium transition-all duration-200 hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select 
            onChange={(e) => onChange({ status: e.target.value || undefined })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground font-medium transition-all duration-200 hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
    </div>
  );
}