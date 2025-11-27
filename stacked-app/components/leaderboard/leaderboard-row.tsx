"use client";

import { motion } from "framer-motion";
import { User, getUserRank } from "@/lib/data/users";
import { getRankColor, formatNetWorthWithCents } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";
import { Avatar } from "@/components/ui/avatar";

interface LeaderboardRowProps {
  user: User;
  isCurrentUser?: boolean;
  onProfile?: (user: User) => void;
  variants?: any;
}

export function LeaderboardRow({
  user,
  isCurrentUser,
  onProfile,
  variants,
}: LeaderboardRowProps) {
  const rank = getUserRank(user.id);

  const handleClick = () => {
    if (onProfile) {
      onProfile(user);
    }
  };

  return (
    <motion.tr
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      variants={variants}
      className={`border-b border-border hover:bg-background-lighter transition-colors cursor-pointer ${
        isCurrentUser ? "bg-background-lighter" : ""
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
            <p className="font-medium text-text">@{user.username}</p>
            <p className="text-xs text-text-muted">{user.phone}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <p className="font-bold text-accent">
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
      <td className="hidden md:table-cell px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          {user.isOG && <Tag variant="og">OG</Tag>}
          {user.isEarly && <Tag variant="early">Early</Tag>}
          {isCurrentUser && <Tag variant="you">You</Tag>}
        </div>
      </td>
    </motion.tr>
  );
}
