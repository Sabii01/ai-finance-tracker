// frontend/src/components/CancleSubscriptionButton.tsx
export function CancleSubscriptionButton({ sub }: { sub: any }) {
  const handleCancel = () => {
    if (confirm(`Are you sure you want to cancel ${sub.name}?`)) {
      console.log("Cancelling subscription ID:", sub.id);
      // We will plug in the useMutation here later!
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border">
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">{sub.name}</h4>
        <p className="text-sm text-gray-500">${sub.price} / {sub.billingCycle}</p>
      </div>
      
      {sub.status === "active" ? (
        <button 
          onClick={handleCancel}
          className="text-xs font-medium px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/20 transition-colors"
        >
          Cancel
        </button>
      ) : (
        <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:text-zinc-500">
          Cancelled
        </span>
      )}
    </div>
  );
}