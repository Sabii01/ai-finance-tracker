// frontend/src/components/InsightsModal.tsx
"use client";

import { useInsights } from "@/hooks/useInsights";
import { useState } from "react";

export function InsightsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: getInsights, data, isPending, error } = useInsights();

  const handleGetInsights = () => {
    setIsOpen(true);
    getInsights();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      {/* <button
        onClick={handleGetInsights}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        Get AI Insights
      </button> */}

      <button type="button" className="insights" onClick={handleGetInsights}>
        <p id="ai">Get AI Insights</p>
        <div id="container-stars">
          <div id="stars"></div>
        </div>

        <div id="glow">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 w-full flex items-center justify-center p-4 bg-black/50 backdrop-blur-xl animate-fade-in mt-10 overflow-y-scroll scroll-smooth no-scrollbar">
          <div className="relative w-full max-w-2xl bg-white dark:bg-gray-100 rounded-2xl shadow-2xl max-h-[80vh] overflow-y-scroll no-scrollbar animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold dark:text-gray-900">
                    AI Insights
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Powered by Gemini AI
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto no-scrollbar scroll-smooth max-h-[calc(80vh-140px)]">
              {isPending && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    Analyzing your spending...
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    This may take a few seconds
                  </p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-red-700 dark:text-red-300 font-semibold">
                    Failed to generate insights
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {error.message}
                  </p>
                </div>
              )}

              {data && (
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-800/70 rounded-xl border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-600 dark:text-blue-200 font-medium">
                        Expenses Analyzed
                      </p>
                      <p className="text-2xl font-bold text-blue-200 dark:text-blue-200 mt-1">
                        {data.expenseCount}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/70 rounded-xl border border-purple-200 dark:border-purple-800">
                      <p className="text-sm text-purple-600 dark:text-purple-100 font-medium">
                        Active Subscriptions
                      </p>
                      <p className="text-2xl font-bold text-purple-100 dark:text-purple-200 mt-1">
                        {data.subscriptionCount}
                      </p>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-600 mb-2">
                          Your Personalized Insights
                        </h3>
                        {/* The magic: white-space: pre-line preserves \n */}
                        <p className="text-gray-700 dark:text-gray-700 leading-relaxed whitespace-pre-line">
                          {data.insights}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-2xl mt-10 bg-gray-300 h-2xl rounded-l-2xl flex"></div>
          </div>
        </div>
      )}
    </>
  );
}
