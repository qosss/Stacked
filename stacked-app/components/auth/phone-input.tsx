"use client";

import { useState, useRef, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

type CountryCode = ReturnType<typeof getCountries>[number];

// Convert country code to flag emoji
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// Popular countries shown at top
const POPULAR_COUNTRIES: CountryCode[] = ["US", "GB", "CA", "AU", "DE", "FR", "IN", "JP"];

// Phone number lengths by country (national number length, excluding country code)
const PHONE_LENGTHS: Partial<Record<CountryCode, number>> = {
  US: 10, CA: 10, // North America
  GB: 10, // UK
  AU: 9, // Australia
  DE: 10, // Germany (can vary 10-11, using 10)
  FR: 9, // France
  IN: 10, // India
  JP: 10, // Japan
  MX: 10, // Mexico
  BR: 11, // Brazil
  IT: 10, // Italy
  ES: 9, // Spain
  NL: 9, // Netherlands
  BE: 9, // Belgium
  CH: 9, // Switzerland
  AT: 10, // Austria
  PL: 9, // Poland
  SE: 9, // Sweden
  NO: 8, // Norway
  DK: 8, // Denmark
  FI: 9, // Finland
  IE: 9, // Ireland
  NZ: 9, // New Zealand
  SG: 8, // Singapore
  HK: 8, // Hong Kong
  KR: 10, // South Korea
  CN: 11, // China
};

// Default length for countries not in the map
const DEFAULT_PHONE_LENGTH = 10;

// Format phone number with dashes based on country
const formatPhoneNumber = (digits: string, country: CountryCode): string => {
  const length = PHONE_LENGTHS[country] || DEFAULT_PHONE_LENGTH;
  const limited = digits.slice(0, length);

  // US/CA format: XXX-XXX-XXXX
  if ((country === "US" || country === "CA") && limited.length > 0) {
    if (limited.length <= 3) return limited;
    if (limited.length <= 6) return `${limited.slice(0, 3)}-${limited.slice(3)}`;
    return `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6)}`;
  }

  // UK format: XXXX-XXX-XXX
  if (country === "GB" && limited.length > 0) {
    if (limited.length <= 4) return limited;
    if (limited.length <= 7) return `${limited.slice(0, 4)}-${limited.slice(4)}`;
    return `${limited.slice(0, 4)}-${limited.slice(4, 7)}-${limited.slice(7)}`;
  }

  // Default format: XXX-XXX-XXXX (groups of 3-3-4)
  if (limited.length <= 3) return limited;
  if (limited.length <= 6) return `${limited.slice(0, 3)}-${limited.slice(3)}`;
  return `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6)}`;
};

export function PhoneInput({ value, onChange, disabled }: PhoneInputProps) {
  const [country, setCountry] = useState<CountryCode>("US");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const countries = getCountries();
  const callingCode = getCountryCallingCode(country);

  // Filter and sort countries
  const filteredCountries = useMemo(() => {
    const searchLower = search.toLowerCase();
    const filtered = countries.filter((code) => {
      const name = en[code] || code;
      const dialCode = getCountryCallingCode(code);
      return (
        name.toLowerCase().includes(searchLower) ||
        code.toLowerCase().includes(searchLower) ||
        dialCode.includes(search)
      );
    });

    // Sort: popular first, then alphabetically
    return filtered.sort((a, b) => {
      const aPopular = POPULAR_COUNTRIES.includes(a);
      const bPopular = POPULAR_COUNTRIES.includes(b);
      if (aPopular && !bPopular) return -1;
      if (!aPopular && bPopular) return 1;
      return (en[a] || a).localeCompare(en[b] || b);
    });
  }, [countries, search]);

  const handleCountrySelect = (code: CountryCode) => {
    setCountry(code);
    setIsOpen(false);
    setSearch("");
    // Update value with new country code, limit to new country's max length
    const newMaxLength = PHONE_LENGTHS[code] || DEFAULT_PHONE_LENGTH;
    const digits = value.replace(/\D/g, "").replace(/^1/, "").slice(0, newMaxLength);
    const newCallingCode = getCountryCallingCode(code);
    onChange(`+${newCallingCode}${digits}`);
    inputRef.current?.focus();
  };

  const maxLength = PHONE_LENGTHS[country] || DEFAULT_PHONE_LENGTH;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Only allow digits, limit to max length
    const digits = input.replace(/\D/g, "").slice(0, maxLength);
    onChange(`+${callingCode}${digits}`);
  };

  // Extract just the national number (without country code) and format it
  const nationalNumber = useMemo(() => {
    const digits = value.replace(/\D/g, "");
    const codeLength = callingCode.length;
    let national = digits;
    if (digits.startsWith(callingCode)) {
      national = digits.slice(codeLength);
    }
    // Limit to max length and format with dashes
    return formatPhoneNumber(national.slice(0, maxLength), country);
  }, [value, callingCode, country, maxLength]);

  // Close dropdown when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
      setSearch("");
    }
  };

  // Add/remove click listener
  useState(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => searchRef.current?.focus(), 0);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">
        Phone Number
      </label>
      <div className="relative" ref={dropdownRef}>
        <div
          className={cn(
            "flex w-full bg-background-deep border border-border rounded-sm font-mono text-sm transition-all duration-200",
            isFocused && "border-accent shadow-[0_0_0_3px_rgba(200,255,0,0.1)]",
            !isFocused && "hover:border-border-light",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {/* Country selector */}
          <div>
            <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className={cn(
              "flex items-center gap-1.5 px-3 py-3 border-r border-border transition-colors",
              "hover:bg-background-hover",
              disabled && "cursor-not-allowed"
            )}
          >
            <span className="text-lg leading-none">{getFlagEmoji(country)}</span>
            <span className="text-text-secondary text-xs">+{callingCode}</span>
            <ChevronDown className="w-3 h-3 text-text-muted" />
          </button>
        </div>

          {/* Phone input */}
          <input
            ref={inputRef}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={nationalNumber}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            placeholder={country === "US" || country === "CA" ? "XXX-XXX-XXXX" : "Phone number"}
            className={cn(
              "flex-1 bg-transparent px-3 py-3 text-text-primary placeholder:text-text-muted",
              "focus:outline-none",
              disabled && "cursor-not-allowed"
            )}
          />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-background-card border border-border rounded-sm shadow-lg z-50 overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search countries..."
                  className="w-full bg-background-deep border border-border rounded-sm pl-8 pr-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Country list */}
            <div className="max-h-64 overflow-y-auto">
              {filteredCountries.length === 0 ? (
                <div className="px-3 py-4 text-center text-text-muted text-sm">
                  No countries found
                </div>
              ) : (
                filteredCountries.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleCountrySelect(code)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-left transition-colors",
                      "hover:bg-background-hover",
                      code === country && "bg-accent-dim"
                    )}
                  >
                    <span className="text-lg leading-none">{getFlagEmoji(code)}</span>
                    <span className="flex-1 text-sm text-text-primary truncate">
                      {en[code] || code}
                    </span>
                    <span className="text-xs text-text-muted">
                      +{getCountryCallingCode(code)}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <p className="text-text-muted text-xs mt-1">
        Select your country and enter your phone number
      </p>
    </div>
  );
}
