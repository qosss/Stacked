"use client";

import { Input } from "@/components/ui/input";
import { DISPLAY_NAME_MAX_LENGTH, DISPLAY_NAME_REGEX, sanitizeDisplayName } from "@/lib/validation";

interface DisplayNameInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export function DisplayNameInput({
  value,
  onChange,
  disabled,
  error,
}: DisplayNameInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeDisplayName(e.target.value);
    onChange(sanitized);
  };

  const isValid = value.length >= 2 && DISPLAY_NAME_REGEX.test(value);
  const inputId = "displayname-input";
  const helperId = "displayname-help";
  const errorId = "displayname-error";

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-text mb-2">
        Display Name
      </label>
      <div className="relative">
        <Input
          id={inputId}
          type="text"
          placeholder="Your Name"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          maxLength={DISPLAY_NAME_MAX_LENGTH}
          aria-required="true"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={helperId + (error ? ` ${errorId}` : "")}
          className={`pr-10 ${
            error ? "border-red-500" : isValid ? "border-accent" : ""
          }`}
        />
        {isValid && !error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="text-accent text-lg" aria-hidden="true">✓</span>
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
      <p id={helperId} className="text-text-muted text-xs mt-1">Letters and spaces only, max {DISPLAY_NAME_MAX_LENGTH} characters</p>
    </div>
  );
}
