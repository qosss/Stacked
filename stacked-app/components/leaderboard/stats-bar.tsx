"use client";

import { mockUsers, formatNetWorth } from "@/lib/data/users";

export function StatsBar() {
  const totalMembers = mockUsers.length;
  const totalNetWorth = mockUsers.reduce((sum, user) => sum + user.netWorth, 0);
  const sortedNetWorth = [...mockUsers]
    .sort((a, b) => b.netWorth - a.netWorth)
    .map((u) => u.netWorth);
  const medianNetWorth =
    sortedNetWorth[Math.floor(sortedNetWorth.length / 2)];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-background-lighter border border-border rounded-lg p-4">
        <p className="text-text-muted text-xs font-display uppercase tracking-wide mb-1">
          Total Members
        </p>
        <p className="text-2xl font-bold font-display">{totalMembers}</p>
      </div>
      <div className="bg-background-lighter border border-border rounded-lg p-4">
        <p className="text-text-muted text-xs font-display uppercase tracking-wide mb-1">
          Combined Net Worth
        </p>
        <p className="text-2xl font-bold font-display">
          {formatNetWorth(totalNetWorth)}
        </p>
      </div>
      <div className="bg-background-lighter border border-border rounded-lg p-4">
        <p className="text-text-muted text-xs font-display uppercase tracking-wide mb-1">
          Median Net Worth
        </p>
        <p className="text-2xl font-bold font-display">
          {formatNetWorth(medianNetWorth)}
        </p>
      </div>
    </div>
  );
}
