"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function PhoneInput({ value, onChange, disabled }: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, "");

    if (cleaned.length === 0) return "";
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6)
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `+1-${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    const formatted = formatPhoneNumber(phoneNumber);
    onChange(formatted);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-text mb-2">
        Phone Number
      </label>
      <Input
        type="tel"
        placeholder="+1-555-0000"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className={isFocused ? "ring-2 ring-accent" : ""}
      />
    </div>
  );
}
