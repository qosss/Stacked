"use client";

import { User, getUserRank } from "@/lib/data/users";
import { formatNetWorthWithCents, getRankColor } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { RankChangeIndicator } from "@/components/ui/rank-change-indicator";
import { XLogo } from "@/components/ui/x-logo";
import { InstagramLogo } from "@/components/ui/instagram-logo";
import { LinkedInLogo } from "@/components/ui/linkedin-logo";
import Link from "next/link";

interface ProfileModalProps {
  user: User;
  onClose: () => void;
}

export function ProfileModal({ user, onClose }: ProfileModalProps) {
  const rank = getUserRank(user.id);

  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <div className="w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo size="sm" />
        </div>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-6 items-center mb-6">
          <Avatar size="lg" initial={user.username.charAt(0).toUpperCase()} />
          <div className="text-center md:text-left mt-4 md:mt-0 md:flex-1">
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {user.displayName}
              {user.isVerified && <Badge variant="verified" className="ml-2 align-middle">Verified</Badge>}
              {user.isOG && <Badge variant="og" className="ml-2 align-middle">OG</Badge>}
              {user.isEarly && <Badge variant="early" className="ml-2 align-middle">Early</Badge>}
            </h2>
            <p className="text-text-muted text-sm">@{user.username}</p>

            {/* Bio */}
            {user.bio && (
              <p className="text-text text-sm italic mt-2">&ldquo;{user.bio}&rdquo;</p>
            )}

            {/* Social Links */}
            {(user.socialX || user.socialInstagram || user.socialLinkedIn) && (
              <div className="flex gap-3 mt-2 justify-center md:justify-start">
                {user.socialX && (
                  <a
                    href={`https://x.com/${user.socialX}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-text transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <XLogo className="h-4 w-4" />
                  </a>
                )}
                {user.socialInstagram && (
                  <a
                    href={`https://instagram.com/${user.socialInstagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-text transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <InstagramLogo className="h-4 w-4" />
                  </a>
                )}
                {user.socialLinkedIn && (
                  <a
                    href={`https://linkedin.com/in/${user.socialLinkedIn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-text transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LinkedInLogo className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}

            {/* Join Date - shown inline on desktop */}
            <p className="text-xs text-text-muted mt-3 hidden md:block">
              Joined {user.joinedDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Stats Row - side by side on desktop */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {/* Rank Banner */}
          <div
            className={`border-2 ${
              rank === 1
                ? "border-rank-gold bg-rank-gold/5"
                : rank === 2
                  ? "border-rank-silver bg-rank-silver/5"
                  : rank === 3
                    ? "border-rank-bronze bg-rank-bronze/5"
                    : "border-border bg-background-elevated"
            } rounded-lg p-4 md:p-5 text-center`}
          >
            <p className={`text-3xl md:text-4xl font-bold flex items-center justify-center ${getRankColor(rank)}`}>
              <RankChangeIndicator currentRank={rank} previousRank={user.previousRank} size="md" />
              #{rank}
            </p>
            <p className="text-text-muted text-xs mt-1">Global Rank</p>
          </div>

          {/* Net Worth */}
          <div className="bg-background-elevated border border-border rounded-lg p-4 md:p-5 text-center">
            <p className="text-3xl md:text-4xl font-bold text-accent">
              {(() => {
                const nw = formatNetWorthWithCents(user.netWorth);
                return (
                  <>
                    {nw.dollars}
                    <span className="text-text-muted text-lg md:text-xl">{nw.cents}</span>
                  </>
                );
              })()}
            </p>
            <p className="text-text-muted text-xs mt-1">Net Worth</p>
          </div>
        </div>

        {/* Join Date - mobile only */}
        <div className="text-xs text-text-muted text-center mb-6 md:hidden">
          Joined {user.joinedDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        {/* Action Button */}
        <Link
          href={`/u/${user.username}`}
          className="block w-full text-center bg-accent text-text-inverse font-bold py-3 rounded-lg hover:bg-accent-hover transition-colors font-mono"
        >
          View Full Profile
        </Link>
      </div>
    </Modal>
  );
}
