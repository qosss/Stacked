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
import { cn } from "@/lib/utils";

interface LeaderboardRowProps {
  user: User;
  isCurrentUser?: boolean;
  onProfile?: (user: User) => void;
  variants?: any;
  isFocused?: boolean;
  distanceFromFocus?: number;
}

export const LeaderboardRow = forwardRef<HTMLDivElement, LeaderboardRowProps>(
  function LeaderboardRow({ user, isCurrentUser, onProfile, variants, isFocused = false, distanceFromFocus = 0 }, ref) {
    const rank = getUserRank(user.id);

    const handleClick = () => {
      if (onProfile) {
        onProfile(user);
      }
    };

    // Get row classes based on rank and focus
    const getRowClasses = () => {
      const base = "transition-all cursor-pointer rounded-lg";

      if (isFocused) {
        if (isCurrentUser) {
          return `${base} bg-accent/20 border-2 border-accent shadow-lg`;
        }
        switch (rank) {
          case 1:
            return `${base} bg-rank-gold/10 border-2 border-rank-gold shadow-lg`;
          case 2:
            return `${base} bg-rank-silver/10 border-2 border-rank-silver shadow-lg`;
          case 3:
            return `${base} bg-rank-bronze/10 border-2 border-rank-bronze shadow-lg`;
          default:
            return `${base} bg-background-lighter border-2 border-accent/50 shadow-lg`;
        }
      }

      // Non-focused styles
      if (isCurrentUser) {
        return `${base} bg-accent/5 border border-accent/30`;
      }

      switch (rank) {
        case 1:
          return `${base} bg-rank-gold/5 border border-rank-gold/30`;
        case 2:
          return `${base} bg-rank-silver/5 border border-rank-silver/30`;
        case 3:
          return `${base} bg-rank-bronze/5 border border-rank-bronze/30`;
        default:
          return `${base} bg-background-elevated/50 border border-border/50`;
      }
    };

    // Calculate scale and opacity based on distance from focus
    const getScale = () => {
      if (isFocused) return 1.03;
      const absDistance = Math.abs(distanceFromFocus);
      return Math.max(0.9, 1 - absDistance * 0.05);
    };

    const getOpacity = () => {
      if (isFocused) return 1;
      const absDistance = Math.abs(distanceFromFocus);
      return Math.max(0.35, 1 - absDistance * 0.35);
    };

    // Get glow color based on rank
    const getGlowColor = () => {
      if (!isFocused) return "inset 0 0 0 rgba(0,0,0,0)";
      if (isCurrentUser) return "inset 0 0 40px rgba(200, 255, 0, 0.25)";
      switch (rank) {
        case 1: return "inset 0 0 40px rgba(255, 215, 0, 0.3)";
        case 2: return "inset 0 0 40px rgba(192, 192, 192, 0.3)";
        case 3: return "inset 0 0 40px rgba(205, 127, 50, 0.3)";
        default: return "inset 0 0 30px rgba(200, 255, 0, 0.15)";
      }
    };

    return (
      <motion.div
        ref={ref}
        data-entry
        layout
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          scale: getScale(),
          opacity: getOpacity(),
          rotateX: isFocused ? 0 : distanceFromFocus * -1.5,
          y: isFocused ? -2 : 0,
          boxShadow: getGlowColor(),
        }}
        whileHover={{
          scale: isFocused ? 1.05 : getScale() + 0.02,
          y: -4,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.8,
        }}
        variants={variants}
        className={cn(
          getRowClasses(),
          "grid grid-cols-[80px_1fr_100px] md:grid-cols-[100px_1fr_160px] items-center px-4 py-4 h-[80px]"
        )}
        onClick={handleClick}
      >
        {/* Rank */}
        <div className="font-bold text-center">
          <div className="inline-flex items-center gap-1">
            <RankChangeIndicator currentRank={rank} previousRank={user.previousRank} showNew={false} />
            <span className={cn(getRankColor(rank), rank <= 3 ? "text-lg" : "text-sm")}>#{rank}</span>
          </div>
        </div>

        {/* Member */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden md:block shrink-0">
            <Avatar size="sm" initial={user.username.charAt(0).toUpperCase()} />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-text truncate">
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

        {/* Net Worth */}
        <div className="text-right">
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
        </div>
      </motion.div>
    );
  }
);
