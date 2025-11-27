"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function PhoneInput({ value, onChange, disabled }: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = "phone-input";
  const helperId = "phone-help";

  // Format phone number consistently: +1 (XXX) XXX-XXXX
  const formatPhoneNumber = (digits: string): string => {
    const d = digits.slice(0, 10);
    if (d.length === 0) return "";
    if (d.length <= 3) return `+1 (${d}`;
    if (d.length <= 6) return `+1 (${d.slice(0, 3)}) ${d.slice(3)}`;
    return `+1 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };

  // Extract digits from any input format, handling autofill
  const extractDigits = (input: string): string => {
    let digits = input.replace(/\D/g, "");

    // Handle country codes: strip leading "1" if 11 digits
    if (digits.length === 11 && digits.startsWith("1")) {
      digits = digits.slice(1);
    }

    return digits.slice(0, 10);
  };

  // Calculate cursor position based on target digit index
  const calculateCursorPosition = (
    formattedValue: string,
    targetDigitIndex: number
  ): number => {
    let digitCount = 0;
    for (let i = 0; i < formattedValue.length; i++) {
      if (/\d/.test(formattedValue[i])) {
        if (digitCount === targetDigitIndex) return i;
        digitCount++;
      }
    }
    return formattedValue.length;
  };

  // Count digits before a given position in a string
  const countDigitsBefore = (str: string, position: number): number => {
    return str.slice(0, position).replace(/\D/g, "").length;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const cursorPos = input.selectionStart || 0;
    const selectionEnd = input.selectionEnd || 0;

    if (e.key === "Backspace") {
      // If there's a selection, let default behavior handle it via onChange
      if (cursorPos !== selectionEnd) return;

      const digitsBeforeCursor = countDigitsBefore(value, cursorPos);

      // Nothing to delete
      if (digitsBeforeCursor === 0) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const allDigits = value.replace(/\D/g, "");
      const newDigits =
        allDigits.slice(0, digitsBeforeCursor - 1) +
        allDigits.slice(digitsBeforeCursor);
      const formatted = formatPhoneNumber(newDigits);

      onChange(formatted);
      setCursorPosition(
        calculateCursorPosition(formatted, digitsBeforeCursor - 1)
      );
    } else if (e.key === "Delete") {
      // If there's a selection, let default behavior handle it via onChange
      if (cursorPos !== selectionEnd) return;

      const allDigits = value.replace(/\D/g, "");
      const digitsBeforeCursor = countDigitsBefore(value, cursorPos);

      // Nothing to delete (cursor at end)
      if (digitsBeforeCursor >= allDigits.length) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const newDigits =
        allDigits.slice(0, digitsBeforeCursor) +
        allDigits.slice(digitsBeforeCursor + 1);
      const formatted = formatPhoneNumber(newDigits);

      onChange(formatted);
      setCursorPosition(
        calculateCursorPosition(formatted, digitsBeforeCursor)
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cursorPos = e.target.selectionStart || 0;

    const newDigits = extractDigits(inputValue);
    const oldDigits = value.replace(/\D/g, "");

    // Format the new value
    const formatted = formatPhoneNumber(newDigits);

    // Calculate cursor position
    const inputDigitsBefore = countDigitsBefore(inputValue, cursorPos);
    const digitsAdded = newDigits.length - oldDigits.length;

    // Position cursor after the digits that were there plus any new ones
    let targetDigitIndex: number;
    if (digitsAdded > 0) {
      // Adding digits: place cursor after the newly added digits
      targetDigitIndex = inputDigitsBefore;
    } else {
      // Deleting or replacing: handled by keydown, but fallback here
      targetDigitIndex = Math.max(0, inputDigitsBefore);
    }

    onChange(formatted);
    setCursorPosition(calculateCursorPosition(formatted, targetDigitIndex));
  };

  useEffect(() => {
    if (cursorPosition !== null && inputRef.current) {
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      setCursorPosition(null);
    }
  }, [cursorPosition, value]);

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-text mb-2"
      >
        Phone Number
      </label>
      <Input
        ref={inputRef}
        id={inputId}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="+1 (555) 123-4567"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        maxLength={18}
        aria-required="true"
        aria-describedby={helperId}
        className={isFocused ? "ring-2 ring-accent" : ""}
      />
      <p id={helperId} className="text-text-muted text-xs mt-1">
        Enter your 10-digit phone number
      </p>
    </div>
  );
}
