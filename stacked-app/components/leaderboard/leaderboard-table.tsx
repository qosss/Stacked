"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { User, mockUsers, getUserRank } from "@/lib/data/users";
import { getRankColor, formatNetWorthWithCents } from "@/lib/utils";
import { LeaderboardRow } from "./leaderboard-row";
import { ProfileModal } from "./profile-modal";
import { useAuth } from "@/contexts/auth-context";
import { Select } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type SortBy = "high-low" | "low-high" | "recent";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export function LeaderboardTable() {
  const { user: currentUser } = useAuth();
  const [sortBy, setSortBy] = useState<SortBy>("high-low");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const userRowRef = useRef<HTMLTableRowElement>(null);

  const getSortedUsers = () => {
    const usersCopy = [...mockUsers].slice(0, 100); // Top 100

    switch (sortBy) {
      case "high-low":
        return usersCopy.sort((a, b) => b.netWorth - a.netWorth);
      case "low-high":
        return usersCopy.sort((a, b) => a.netWorth - b.netWorth);
      case "recent":
        return usersCopy.sort(
          (a, b) =>
            new Date(b.joinedDate).getTime() -
            new Date(a.joinedDate).getTime()
        );
      default:
        return usersCopy;
    }
  };

  const sortedUsers = getSortedUsers();

  // Find current user's rank
  const currentUserRank = currentUser ? getUserRank(currentUser.id) : null;

  // Scroll to user's position when logged in
  useEffect(() => {
    if (currentUser && userRowRef.current && sortBy === "high-low") {
      setTimeout(() => {
        userRowRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    }
  }, [currentUser, sortBy]);

  return (
    <>
      {/* User's Position Card (shown when logged in) */}
      {currentUser && currentUserRank && (
        <div className="mb-6 bg-background-lighter border-2 border-accent rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar
                size="md"
                initial={currentUser.username.charAt(0).toUpperCase()}
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-text">@{currentUser.username}</p>
                  <Badge variant="you">You</Badge>
                </div>
                <p className="text-sm text-text-muted">Your position on the leaderboard</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-3xl font-bold font-display ${getRankColor(currentUserRank)}`}>
                #{currentUserRank}
              </p>
              <p className="text-lg font-bold text-accent">
                {(() => {
                  const nw = formatNetWorthWithCents(currentUser.netWorth);
                  return (
                    <>
                      {nw.dollars}
                      <span className="text-text-muted text-sm">{nw.cents}</span>
                    </>
                  );
                })()}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold font-display">
          {currentUser ? "Leaderboard" : "Top 100"}
        </h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-muted">Sort by:</label>
          <Select
            value={sortBy}
            onChange={(value) => setSortBy(value as SortBy)}
            options={[
              { value: "high-low", label: "High → Low" },
              { value: "low-high", label: "Low → High" },
              { value: "recent", label: "Recently Joined" },
            ]}
          />
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto overflow-x-hidden">
          <table className="w-full table-fixed">
            <thead className="border-b border-border sticky top-0 z-10">
              <tr>
                <th className="bg-background-lighter px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider w-20">
                  Rank
                </th>
                <th className="bg-background-lighter px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">
                  Member
                </th>
                <th className="bg-background-lighter px-6 py-3 text-right text-xs font-bold text-text-muted uppercase tracking-wider w-32">
                  Net Worth
                </th>
                <th className="bg-background-lighter hidden md:table-cell px-6 py-3 text-right text-xs font-bold text-text-muted uppercase tracking-wider w-28">
                  Badges
                </th>
              </tr>
            </thead>
            <motion.tbody
              key={sortBy}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {sortedUsers.map((user) => {
                const isCurrentUserRow = currentUser?.id === user.id;
                return (
                  <LeaderboardRow
                    key={user.id}
                    user={user}
                    isCurrentUser={isCurrentUserRow}
                    onProfile={setSelectedUser}
                    variants={rowVariants}
                    ref={isCurrentUserRow ? userRowRef : undefined}
                  />
                );
              })}
            </motion.tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <ProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
}
