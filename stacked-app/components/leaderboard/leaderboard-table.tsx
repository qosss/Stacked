"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, mockUsers } from "@/lib/data/users";
import { LeaderboardRow } from "./leaderboard-row";
import { ProfileModal } from "./profile-modal";
import { useAuth } from "@/contexts/auth-context";

type SortBy = "networth" | "recent" | "name";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function LeaderboardTable() {
  const { user: currentUser } = useAuth();
  const [sortBy, setSortBy] = useState<SortBy>("networth");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getSortedUsers = () => {
    const usersCopy = [...mockUsers];

    switch (sortBy) {
      case "networth":
        return usersCopy.sort((a, b) => b.netWorth - a.netWorth);
      case "recent":
        return usersCopy.sort(
          (a, b) =>
            new Date(b.joinedDate).getTime() -
            new Date(a.joinedDate).getTime()
        );
      case "name":
        return usersCopy.sort((a, b) =>
          a.username.localeCompare(b.username)
        );
      default:
        return usersCopy;
    }
  };

  const sortedUsers = getSortedUsers();

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold font-display">Leaderboard</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-muted">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="bg-background-lighter border border-border rounded px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="networth">Net Worth</option>
            <option value="recent">Recently Joined</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-background-lighter border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider w-12">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-text-muted uppercase tracking-wider">
                Net Worth
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-text-muted uppercase tracking-wider w-24">
                Tags
              </th>
            </tr>
          </thead>
          <motion.tbody
            key={sortBy}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {sortedUsers.map((user) => (
              <LeaderboardRow
                key={user.id}
                user={user}
                isCurrentUser={currentUser?.id === user.id}
                onProfile={setSelectedUser}
                variants={rowVariants}
              />
            ))}
          </motion.tbody>
        </table>
      </div>

      {selectedUser && (
        <ProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
}
