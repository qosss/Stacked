"use client";

import { User, getUserRank } from "@/lib/data/users";
import { formatNetWorthWithCents, getRankColor } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
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
        {/* Logo - hidden on desktop */}
        <div className="flex justify-center mb-6 md:hidden">
          <Logo size="sm" />
        </div>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-6 items-center mb-6">
          <Avatar size="lg" initial={user.username.charAt(0).toUpperCase()} />
          <div className="text-center md:text-left mt-4 md:mt-0 md:flex-1">
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {user.displayName}
            </h2>
            <p className="text-text-muted text-sm">@{user.username}</p>

            {/* Badges */}
            <div className="flex gap-2 mt-2 justify-center md:justify-start">
              {user.isOG && <Badge variant="og">OG</Badge>}
              {user.isEarly && <Badge variant="early">Early</Badge>}
            </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
            <p className={`text-3xl md:text-4xl font-bold ${getRankColor(rank)}`}>
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
