"use client";

import { Input } from "@/components/ui/input";
import { XLogo } from "@/components/ui/x-logo";
import { InstagramLogo } from "@/components/ui/instagram-logo";
import { LinkedInLogo } from "@/components/ui/linkedin-logo";

interface SocialLinksInputProps {
  xValue: string;
  instagramValue: string;
  linkedinValue: string;
  bioValue: string;
  onXChange: (value: string) => void;
  onInstagramChange: (value: string) => void;
  onLinkedInChange: (value: string) => void;
  onBioChange: (value: string) => void;
  disabled?: boolean;
}

// X: max 15 chars, alphanumeric + underscore
const sanitizeX = (value: string): string => {
  return value.replace(/[^A-Za-z0-9_]/g, "").slice(0, 15);
};

// Instagram: max 30 chars, alphanumeric + underscore + dot
const sanitizeInstagram = (value: string): string => {
  return value.replace(/[^A-Za-z0-9_.]/g, "").slice(0, 30);
};

// LinkedIn: max 100 chars for custom URL slug
const sanitizeLinkedIn = (value: string): string => {
  return value.replace(/[^A-Za-z0-9-]/g, "").slice(0, 100);
};

export function SocialLinksInput({
  xValue,
  instagramValue,
  linkedinValue,
  bioValue,
  onXChange,
  onInstagramChange,
  onLinkedInChange,
  onBioChange,
  disabled,
}: SocialLinksInputProps) {
  return (
    <div className="space-y-4">
      {/* Bio Input */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Bio
        </label>
        <textarea
          placeholder="Tell us about yourself..."
          value={bioValue}
          onChange={(e) => onBioChange(e.target.value.slice(0, 160))}
          disabled={disabled}
          rows={3}
          className="w-full bg-background-deep border border-border rounded-sm px-3 py-3 font-mono text-base text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="text-text-muted text-xs mt-1">{bioValue.length}/160 characters</p>
      </div>

      {/* X Input */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          X
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-text-muted">
            <XLogo className="h-4 w-4" />
            <span className="text-sm">@</span>
          </div>
          <Input
            type="text"
            placeholder="username"
            value={xValue}
            onChange={(e) => onXChange(sanitizeX(e.target.value))}
            disabled={disabled}
            className="pl-14"
          />
        </div>
      </div>

      {/* Instagram Input */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Instagram
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-text-muted">
            <InstagramLogo className="h-4 w-4" />
            <span className="text-sm">@</span>
          </div>
          <Input
            type="text"
            placeholder="username"
            value={instagramValue}
            onChange={(e) => onInstagramChange(sanitizeInstagram(e.target.value))}
            disabled={disabled}
            className="pl-14"
          />
        </div>
      </div>

      {/* LinkedIn Input */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          LinkedIn
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-text-muted">
            <LinkedInLogo className="h-4 w-4" />
            <span className="text-sm">/in/</span>
          </div>
          <Input
            type="text"
            placeholder="username"
            value={linkedinValue}
            onChange={(e) => onLinkedInChange(sanitizeLinkedIn(e.target.value))}
            disabled={disabled}
            className="pl-16"
          />
        </div>
      </div>
    </div>
  );
}
