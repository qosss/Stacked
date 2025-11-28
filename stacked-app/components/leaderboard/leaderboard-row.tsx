"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { User, getUserRank } from "@/lib/data/users";
import { getRankColor, formatNetWorthCompact } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

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

    return (
      <motion.tr
        ref={ref}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        variants={variants}
        className={`border-b border-border hover:bg-background-lighter transition-colors cursor-pointer ${
          isCurrentUser ? "bg-accent/10 border-l-2 border-l-accent" : ""
        }`}
        onClick={handleClick}
      >
        <td className="px-6 py-4 text-sm font-bold text-center">
          <span className={getRankColor(rank)}># {rank}</span>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Avatar size="sm" initial={user.username.charAt(0).toUpperCase()} />
            </div>
            <div>
              <p className="font-medium text-text">{user.displayName}</p>
              <p className="text-xs text-text-muted">@{user.username}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-right">
          <p className="font-bold text-accent">
            {formatNetWorthCompact(user.netWorth)}
          </p>
        </td>
        <td className="hidden md:table-cell px-6 py-4 text-right">
          <div className="flex justify-end gap-2">
            {user.isOG && <Badge variant="og">OG</Badge>}
            {user.isEarly && <Badge variant="early">Early</Badge>}
            {isCurrentUser && <Badge variant="you">You</Badge>}
          </div>
        </td>
      </motion.tr>
    );
  }
);
