// "use client";
// import { ExpenseListSkeleton } from "@/components/ExpenseListSkeleton";
// import { useState } from "react";
// import { ExpenseFilters } from "@/components/ExpenseFilters";
// import ExpenseList from "./list";
// import { useExpenses } from "@/hooks/useExpenses";
// import { EmptyExpenses } from "@/components/EmptyExpenses";

// export default function ExpensesPage() {
//   const [filters, setFilters] = useState({});
//   const { data, isLoading } = useExpenses();
  
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background p-6 md:p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
//               All Expenses
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Track and manage your spending
//             </p>
//           </div>
//           <ExpenseListSkeleton />
//         </div>
//       </div>
//     );
//   }
  
//   if (!isLoading && data!.length === 0) {
//     return <EmptyExpenses />;
//   }
  
//   return (
//     <div className="min-h-screen bg-background p-6 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
//             All Expenses
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Track and manage your spending
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="mb-6">
//           <ExpenseFilters onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))} />
//         </div>

//         {/* Expense List */}
//         <ExpenseList filters={filters} />
//       </div>
//     </div>
//   );
// }


// frontend/src/app/(protected)/expenses/page.tsx
"use client";

import { useState } from "react";
import { ExpenseFilters } from "@/components/ExpenseFilters";
import ExpenseList from "./list";

export default function ExpensesPage() {
  const [filters, setFilters] = useState({});

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            All Expenses
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage your spending
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <ExpenseFilters onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))} />
        </div>

        {/* Expense List - handles its own loading and empty states */}
        <ExpenseList filters={filters} />
      </div>
    </div>
  );
}