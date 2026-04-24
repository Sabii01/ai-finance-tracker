import Link from "next/link";

export function EmptySubscriptions() {
  return (
    <div className="rounded-xl border border-dashed p-8 text-center">
      <h3 className="text-lg font-semibold">No subscriptions</h3>
      <p className="mt-1 text-sm text-gray-500">
        Track recurring payments like Netflix, Spotify, SaaS tools.
      </p>

      <Link
        href="/subscriptions/add"
        className="inline-block mt-4 rounded-lg px-4 py-2
                   bg-black text-white dark:bg-white dark:text-black"
      >
        Add subscription
      </Link>
    </div>
  );
}
