"use client";

import { useRef, useEffect } from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function OTPInput({ value, onChange, disabled }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    const newValue = value.split("");
    newValue[index] = val;
    const otpString = newValue.join("").slice(0, 6);

    onChange(otpString);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      const newValue = value.split("");
      newValue[index] = "";
      onChange(newValue.join(""));

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    // Auto focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-text mb-2">
        Enter 6-Digit Code
      </label>
      <div className="flex gap-2 justify-center" role="group" aria-label="OTP code input">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of 6`}
            className="w-12 h-12 text-center text-xl font-bold border border-border rounded bg-background-lighter text-text focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          />
        ))}
      </div>
    </div>
  );
}
