"use client";

type NumberInputProps = {
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
};

export function NumberInput({
  value,
  onChange,
  label,
  placeholder = "0.00",
  min = 0,
  max,
  step = 0.01,
  prefix = "$",
  suffix,
  disabled = false,
}: NumberInputProps) {
  const handleIncrement = () => {
    const currentValue = parseFloat(value.toString()) || 0;
    const newValue = currentValue + step;
    if (!max || newValue <= max) {
      onChange(newValue.toFixed(2));
    }
  };

  const handleDecrement = () => {
    const currentValue = parseFloat(value.toString()) || 0;
    const newValue = currentValue - step;
    if (newValue >= min) {
      onChange(newValue.toFixed(2));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow empty string or valid number
    if (inputValue === "" || !isNaN(parseFloat(inputValue))) {
      onChange(inputValue);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Prefix */}
        {prefix && (
          <span className="absolute left-4 text-gray-500 dark:text-gray-400 font-semibold text-lg pointer-events-none">
            {prefix}
          </span>
        )}

        {/* Input */}
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`flex-1 ${prefix ? "pl-10" : "pl-4"} ${
            suffix ? "pr-20" : "pr-24"
          } py-3 bg-background border border-border rounded-xl text-foreground font-semibold text-lg transition-all duration-200 hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
        />

        {/* Suffix */}
        {suffix && (
          <span className="absolute right-24 text-gray-500 dark:text-gray-400 font-medium pointer-events-none">
            {suffix}
          </span>
        )}

        {/* Increment/Decrement Buttons */}
        <div className="absolute right-2 flex flex-col gap-0.5">
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || (max !== undefined && parseFloat(value.toString()) >= max)}
            className="p-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || parseFloat(value.toString()) <= min}
            className="p-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}