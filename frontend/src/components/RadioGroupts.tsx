"use client";

type RadioOption = {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
};

type RadioGroupProps = {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  columns?: 2 | 3 | 4;
};

export function RadioGroup({
  options,
  value,
  onChange,
  label,
  columns = 2,
}: RadioGroupProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          {label}
        </label>
      )}

      <div className={`grid ${gridCols[columns]} gap-3`}>
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                isSelected
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-950/30 shadow-md"
                  : "border-border bg-surface hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-sm"
              }`}
            >
              {/* Radio Circle */}
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-primary-500 bg-primary-500"
                      : "border-gray-300 dark:border-gray-600 bg-background"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-full h-full text-white p-0.5"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <circle cx="6" cy="6" r="3" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Icon */}
                  {option.icon && (
                    <div className="mb-2 text-gray-600 dark:text-gray-400">
                      {option.icon}
                    </div>
                  )}

                  {/* Label */}
                  <div
                    className={`font-semibold text-sm mb-1 ${
                      isSelected
                        ? "text-primary-700 dark:text-primary-300"
                        : "text-foreground"
                    }`}
                  >
                    {option.label}
                  </div>

                  {/* Description */}
                  {option.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <svg
                    className="w-5 h-5 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}