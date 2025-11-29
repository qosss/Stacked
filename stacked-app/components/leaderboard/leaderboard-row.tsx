"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { User, getUserRank } from "@/lib/data/users";
import { getRankColor, formatNetWorthCompact, formatNetWorthWithCents } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { RankChangeIndicator } from "@/components/ui/rank-change-indicator";
import { XLogo } from "@/components/ui/x-logo";
import { InstagramLogo } from "@/components/ui/instagram-logo";
import { LinkedInLogo } from "@/components/ui/linkedin-logo";

interface LeaderboardRowProps {
  user: User;
  isCurrentUser?: boolean;
  onProfile?: (user: User) => void;
  variants?: any;
}

export const LeaderboardRow = forwardRef<HTMLTableRowElement, LeaderboardRowProps>(
  function LeaderboardRow({ user, isCurrentUser, onProfile, variants }, ref) {
    const rank = getUserRank(user.id);

    const handleClick = () => {
      if (onProfile) {
        onProfile(user);
      }
    };

    // Get row classes based on rank
    const getRowClasses = () => {
      const base = "border-b border-border hover:bg-background-lighter transition-colors cursor-pointer";

      if (isCurrentUser) {
        return `${base} bg-accent/10 border-l-2 border-l-accent`;
      }

      switch (rank) {
        case 1:
          return `${base} bg-rank-gold/5 border-l-2 border-l-rank-gold`;
        case 2:
          return `${base} bg-rank-silver/5 border-l-2 border-l-rank-silver`;
        case 3:
          return `${base} bg-rank-bronze/5 border-l-2 border-l-rank-bronze`;
        default:
          return base;
      }
    };

    return (
      <motion.tr
        ref={ref}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        variants={variants}
        className={getRowClasses()}
        onClick={handleClick}
      >
        <td className="px-4 py-4 font-bold text-center">
          <div className="inline-flex items-center gap-1">
            <RankChangeIndicator currentRank={rank} previousRank={user.previousRank} showNew={false} />
            <span className={`${getRankColor(rank)} ${rank <= 3 ? "text-lg" : "text-sm"}`}>#{rank}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Avatar size="sm" initial={user.username.charAt(0).toUpperCase()} />
            </div>
            <div>
              <p className="font-medium text-text">
                {user.displayName}
                {user.isVerified && <Badge variant="verified" className="ml-2 align-middle">Verified</Badge>}
                {user.isOG && <Badge variant="og" className="ml-2 align-middle">OG</Badge>}
                {user.isEarly && <Badge variant="early" className="ml-2 align-middle">Early</Badge>}
                {isCurrentUser && <Badge variant="you" className="ml-2 align-middle">You</Badge>}
                {user.socialX && <XLogo className="ml-2 h-3.5 w-3.5 text-text-muted inline-block align-middle" />}
                {user.socialInstagram && <InstagramLogo className="ml-1.5 h-3.5 w-3.5 text-text-muted inline-block align-middle" />}
                {user.socialLinkedIn && <LinkedInLogo className="ml-1.5 h-3.5 w-3.5 text-text-muted inline-block align-middle" />}
              </p>
              <p className="text-xs text-text-muted">@{user.username}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-right">
          {/* Compact on mobile */}
          <p className="font-bold text-accent md:hidden">
            {formatNetWorthCompact(user.netWorth)}
          </p>
          {/* Full format with cents on desktop */}
          <p className="font-bold text-accent hidden md:block">
            {(() => {
              const nw = formatNetWorthWithCents(user.netWorth);
              return (
                <>
                  {nw.dollars}
                  <span className="text-text-muted text-sm">{nw.cents}</span>
                </>
              );
            })()}
          </p>
        </td>
      </motion.tr>
    );
  }
);
