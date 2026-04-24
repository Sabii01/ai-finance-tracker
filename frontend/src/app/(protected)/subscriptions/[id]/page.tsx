/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/src/app/(protected)/subscriptions/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useSubscription } from "@/hooks/useSubscription";
import { useSubscriptionExpenses } from "@/hooks/useSubscriptionExpenses";
import { useUpdateSubscription } from "@/hooks/useUpdateSubscription";
import { useDeleteSubscription } from "@/hooks/useDeleteSubscription";
import { useState } from "react";

export default function SubscriptionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: sub, isLoading } = useSubscription(id);
  const { expenses } = useSubscriptionExpenses(id);
  const { mutate: updateSubscription } = useUpdateSubscription();
  const { mutate: deleteSubscription } = useDeleteSubscription();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    price: sub?.price || 0,
    nextBillingDate: sub?.nextBillingDate?.split("T")[0] || "",
    status: sub?.status || "active",
  });

  const router = useRouter();
  if (isLoading || !sub) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin" />
          <p className="text-sm dark:text-gray-400">Loading subscription...</p>
        </div>
      </div>
    );
  }

  const handleToggleStatus = () => {
    if (!sub) return;

    const newStatus = sub.status === "active" ? "paused" : "active";
    updateSubscription({
      id: sub.id,
      data: { status: newStatus },
    });
  };

  const handleDelete = () => {
    if (!sub) return;

    if (confirm(`Delete ${sub.name} subscription? This cannot be undone.`)) {
      deleteSubscription(sub.id, {
        onSuccess: () => {
          router.push("/subscriptions");
        },
      });
    }
  };

  const handleUpdate = () => {
    if (!sub) return;

    updateSubscription(
      {
        id: sub.id,
        data: {
          price: editForm.price,
          nextBillingDate: new Date(editForm.nextBillingDate).toISOString(),
          status: editForm.status,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-page-enter">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Go back"
        >
          <svg
            className="w-6 h-6 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold gradient-text">
            Subscription Details
          </h1>
          <p className="dark:text-gray-400 mt-1">
            View and manage your subscription
          </p>
        </div>
      </div>

      {/* Subscription Info Card */}
      <div className="premium-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left side - Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-secondary opacity-40 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-secondary-900 dark:text-secondary-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold dark:text-gray-800">
                    {sub.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm dark:text-gray-500">
                      {sub.category}
                    </span>
                    <span className="text-gray-600 dark:text-gray-900">•</span>
                    <span className="text-sm px-2 py-1 bg-primary-900 dark:bg-primary-600/80 text-primary-700 dark:text-primary-100 rounded-full font-medium">
                      {sub.billingCycle}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-background rounded-xl border border-border">
                <p className="text-xs font-medium dark:text-gray-500 mb-1">
                  Amount
                </p>
                <p className="text-2xl font-bold dark:text-gray-700">
                  ₹{sub.price.toFixed(2)}
                </p>
                <p className="text-xs dark:text-gray-400 mt-1">
                  per {sub.billingCycle === "monthly" ? "month" : "year"}
                </p>
              </div>

              <div className="p-4 bg-background rounded-xl border border-border">
                <p className="text-xs font-medium dark:text-gray-500 mb-1">
                  Next Billing Date
                </p>
                <p className="text-lg font-semibold dark:text-gray-700">
                  {new Date(sub.nextBillingDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="p-4 bg-background rounded-xl border border-border">
                <p className="text-xs font-medium dark:text-gray-500 mb-1">
                  Status
                </p>
                <span
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
                    sub.status === "active"
                      ? "text-success"
                      : sub.status === "paused"
                      ? "text-warning"
                      : "text-error"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      sub.status === "active"
                        ? "bg-success"
                        : sub.status === "paused"
                        ? "bg-warning"
                        : "bg-error"
                    }`}
                  />
                  {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                </span>
              </div>

              {sub.paymentMethod && (
                <div className="p-4 bg-background rounded-xl border border-border">
                  <p className="text-xs font-medium dark:text-gray-400 mb-1">
                    Payment Method
                  </p>
                  <p className="text-sm font-medium dark:text-gray-500 capitalize">
                    {sub.paymentMethod}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*Buttons For deletion and pause or resume */}

        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          {/* <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Edit Subscription
          </button> */}
             <button className="editbtn" onClick={() => setIsEditing(true)}>Edit 
      <svg className="editsvg" viewBox="0 0 512 512">
        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
    </button>

          <button onClick={handleToggleStatus} className="pstate">
            {sub.status === "active"
              ? "Pause Subscription"
              : "Resume Subscription"}
          </button>

          <button
            onClick={handleDelete}
            className="glass-button"
            aria-label="Delete item"
          >
            <svg
              className="trash-icon"
              xmlns="http://www.w3.org"
              viewBox="0 0 24 24"
              fill="white"
              width="24px"
              height="24px"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
            </svg>
            <span className="btn-text">Delete</span>
          </button>
        </div>
      </div>



      {isEditing && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div className="bg-white dark:bg-gray-200/50 backdrop-blur-3xl rounded-2xl p-6 max-w-md w-full">
      <h3 className="text-xl font-bold mb-4">Edit Subscription</h3>
      
      <div className="space-y-4">
        {/* Price */}
        <div>
          <label className="block text-sm font-semibold mb-2">Price</label>
          <input
            type="number"
            step="0.1"
            value={editForm.price}
            onChange={(e) => setEditForm({...editForm, price: parseFloat(e.target.value)})}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        
        {/* Next Billing Date */}
        <div>
          <label className="block text-sm font-semibold mb-2">Next Billing Date</label>
          <input
            type="date"
            
            value={editForm.nextBillingDate}
            onChange={(e) => setEditForm({...editForm, nextBillingDate: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        
        {/* Status */}
        <div>
          <label className="block text-sm font-semibold mb-2">Status</label>
          <select
            value={editForm.status}
            onChange={(e) => setEditForm({...editForm, status: e.target.value as any})}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setIsEditing(false)}
          className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

      {/* Linked Expenses Section */}
      <div className="premium-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold dark:text-gray-800">
              Linked Expenses
            </h3>
            <p className="text-sm dark:text-gray-600 mt-1">
              Expenses associated with this subscription
            </p>
          </div>
          <span className="ss">
            <span className="spa">
              {expenses.length} {expenses.length === 1 ? "expense" : "expenses"}
            </span>
          </span>
        </div>

        {expenses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg
                className="w-8 h-8 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-sm dark:text-gray-400">
              No expenses linked yet.
            </p>
            <p className="text-xs dark:text-gray-500 mt-1">
              Expenses will appear here when you link them to this subscription
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {expenses.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between p-4 bg-background border border-border rounded-2xl hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-blue-500/70 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-accent-600 dark:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium dark:text-gray-600">
                        {e.description}
                      </p>
                      <p className="text-xs dark:text-gray-500 mt-0.5">
                        {new Date(e.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold dark:text-gray-600">
                    ₹{e.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
