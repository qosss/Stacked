"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { mockUsers } from "@/lib/data/users";

interface UsernameInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export function UsernameInput({
  value,
  onChange,
  disabled,
  error,
}: UsernameInputProps) {
  const [isTaken, setIsTaken] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (!value || value.length < 3) {
      setIsTaken(false);
      return;
    }

    setIsChecking(true);
    const timer = setTimeout(() => {
      const taken = mockUsers.some(
        (user) => user.username.toLowerCase() === value.toLowerCase()
      );
      setIsTaken(taken);
      setIsChecking(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    onChange(newValue);
  };

  const isValid = value.length >= 3 && !isTaken;
  const hasError = error || (isTaken && value.length >= 3);

  return (
    <div>
      <label className="block text-sm font-medium text-text mb-2">
        Username
      </label>
      <div className="relative">
        <Input
          type="text"
          placeholder="yourname"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          maxLength={20}
          className={`pr-10 ${
            hasError ? "border-red-500" : isValid ? "border-accent" : ""
          }`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isChecking ? (
            <div className="w-5 h-5 border-2 border-text-muted border-t-accent rounded-full animate-spin" />
          ) : isValid ? (
            <span className="text-accent text-lg">✓</span>
          ) : isTaken ? (
            <span className="text-red-500 text-lg">✕</span>
          ) : null}
        </div>
      </div>
      {hasError && (
        <p className="text-red-500 text-sm mt-1">
          {isTaken ? "Username already taken" : error}
        </p>
      )}
      <p className="text-text-muted text-xs mt-1">3-20 characters, letters and numbers only</p>
      <p className="text-warning text-xs mt-2 font-medium">⚠️ Usernames are permanent and cannot be changed</p>
    </div>
  );
}
