import { useExpenses } from "./useExpenses";

export function useSubscriptionExpenses(subscriptionId: string) {
  const { data = [], isLoading } = useExpenses();

  return {
    isLoading,
    expenses: data.filter(
      (e) => e.subscriptionId === subscriptionId
    ),
  };
}
