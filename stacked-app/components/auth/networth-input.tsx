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
    const cleaned = val.replace(/[^0-9]/g, "");
    if (!cleaned) return "";
    return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const formatted = formatNetWorthInput(val);
    onChange(formatted);
  };

  const numericValue = parseInt(value.replace(/,/g, ""));
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
          placeholder="1,000,000"
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
