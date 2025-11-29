"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { User, mockUsers, getUserRank } from "@/lib/data/users";
import { getRankColor, formatNetWorthWithCents } from "@/lib/utils";
import { LeaderboardRow } from "./leaderboard-row";
import { ProfileModal } from "./profile-modal";
import { useAuth } from "@/contexts/auth-context";
import { Select } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RankChangeIndicator } from "@/components/ui/rank-change-indicator";

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

const ROW_HEIGHT = 88; // Height of each row including gap

export function LeaderboardTable() {
  const { user: currentUser } = useAuth();
  const [sortBy, setSortBy] = useState<SortBy>("high-low");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const userRowRef = useRef<HTMLDivElement>(null);

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

  // Throttled scroll handler using requestAnimationFrame
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Schedule the calculation on the next frame
    rafRef.current = requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      const entries = container.querySelectorAll('[data-entry]');
      let closestIndex = 0;
      let closestDistance = Infinity;

      entries.forEach((entry, index) => {
        const rect = entry.getBoundingClientRect();
        const entryCenter = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - entryCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setFocusedIndex(closestIndex);
    });
  }, []);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Scroll to user's position when logged in
  useEffect(() => {
    if (currentUser && sortBy === "high-low") {
      const userIndex = sortedUsers.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1 && scrollContainerRef.current) {
        setTimeout(() => {
          const scrollPosition = userIndex * ROW_HEIGHT;
          scrollContainerRef.current?.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        }, 500);
      }
    }
  }, [currentUser, sortBy, sortedUsers]);

  // Initial focus calculation
  useEffect(() => {
    handleScroll();
  }, [handleScroll, sortBy]);

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
                <p className="font-bold text-text">
                  {currentUser.displayName}
                  <Badge variant="you" className="ml-2 align-middle">You</Badge>
                </p>
                <p className="text-sm text-text-muted">@{currentUser.username}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-3xl font-bold font-display ${getRankColor(currentUserRank)}`}>
                <RankChangeIndicator currentRank={currentUserRank} previousRank={currentUser.previousRank} size="md" />
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

      {/* Carousel Container */}
      <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="h-[320px] overflow-y-auto scroll-smooth scrollbar-hide px-2"
          style={{ perspective: "1000px" }}
        >
          {/* Floating Header */}
          <div className="sticky top-0 z-20 bg-background-deep/95 backdrop-blur-sm grid grid-cols-[80px_1fr_100px] md:grid-cols-[100px_1fr_160px] px-4 py-3 -mx-2">
            <span className="text-text-muted text-xs font-bold uppercase tracking-wider text-center">Rank</span>
            <span className="text-text-muted text-xs font-bold uppercase tracking-wider">Member</span>
            <span className="text-text-muted text-xs font-bold uppercase tracking-wider text-right">Net Worth</span>
          </div>
          {/* Top spacer to allow first item to center */}
          <div style={{ height: ROW_HEIGHT }} />

          <motion.div
            key={sortBy}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col gap-2"
            style={{ transformStyle: "preserve-3d" }}
          >
            {sortedUsers.map((user, index) => {
              const isCurrentUserRow = currentUser?.id === user.id;
              return (
                <LeaderboardRow
                  key={user.id}
                  user={user}
                  isCurrentUser={isCurrentUserRow}
                  onProfile={setSelectedUser}
                  variants={rowVariants}
                  isFocused={index === focusedIndex}
                  distanceFromFocus={index - focusedIndex}
                  ref={isCurrentUserRow ? userRowRef : undefined}
                />
              );
            })}
          </motion.div>

        {/* Bottom spacer to allow last item to center */}
        <div style={{ height: ROW_HEIGHT }} />
      </div>

      {selectedUser && (
        <ProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
}
