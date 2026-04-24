For casual buttons:

"sm:flex-1 px-6 py-3.5 bg-gray-200 dark:text-foreground border-2 border-border text-foreground font-semibold rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-900 hover:border-gray-400 dark:hover:text-background dark:hover:border-gray-600 active:scale-[0.98] cursor-pointer"
-----------------------------------------------------------



For alternate selections:

   className={`px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                    form.billingCycle === "monthly"
                      ? "text-background dark:bg-gray-800 dark:text-gray-100 shadow-md"
                      : "bg-background border-2 border-border dark:text-gray-800 hover:border-primary-400"
                  }`}
-----------------------------------------------------------