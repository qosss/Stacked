"use client";

import { Input } from "@/components/ui/input";

interface NetWorthInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export function NetWorthInput({
  value,
  onChange,
  disabled,
  error,
}: NetWorthInputProps) {
  const formatNetWorthInput = (val: string) => {
    // Allow digits and decimal point
    const cleaned = val.replace(/[^0-9.]/g, "");
    if (!cleaned) return "";

    // Split into integer and decimal parts
    const parts = cleaned.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Format integer part with commas
    const formattedInteger = parseInt(integerPart || "0").toLocaleString("en-US");

    // Return with decimal if present (limit to 2 digits)
    if (decimalPart !== undefined) {
      return `${formattedInteger}.${decimalPart.slice(0, 2)}`;
    }

    return formattedInteger;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const formatted = formatNetWorthInput(val);
    onChange(formatted);
  };

  const numericValue = parseFloat(value.replace(/,/g, ""));
  const isValid = !isNaN(numericValue) && numericValue > 0;

  return (
    <div>
      <label className="block text-sm font-medium text-text mb-2">
        Net Worth
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
          $
        </span>
        <Input
          type="text"
          placeholder="1,000,000.00"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`pl-7 ${
            value && !isValid ? "border-red-500" : isValid ? "border-accent" : ""
          }`}
        />
      </div>
      {value && !isValid && (
        <p className="text-red-500 text-sm mt-1">
          {error || "Please enter a valid amount"}
        </p>
      )}
      <p className="text-text-muted text-xs mt-1">Enter your total net worth</p>
    </div>
  );
}
