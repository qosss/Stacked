"use client";

import { useEffect, useState } from "react";
import { mockUsers, formatNetWorth } from "@/lib/data/users";
import { formatNetWorthWithCents } from "@/lib/utils";

export function StatsBar() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalMembers = mockUsers.length;
  const totalNetWorth = mockUsers.reduce((sum, user) => sum + user.netWorth, 0);
  const sortedNetWorth = [...mockUsers]
    .sort((a, b) => b.netWorth - a.netWorth)
    .map((u) => u.netWorth);
  const medianNetWorth =
    sortedNetWorth[Math.floor(sortedNetWorth.length / 2)];

  const NetWorthDisplay = ({ value }: { value: number }) => {
    if (isMobile) {
      return <p className="text-2xl font-bold font-display">{formatNetWorth(value)}</p>;
    }

    const nw = formatNetWorthWithCents(value);
    return (
      <p className="text-2xl font-bold font-display">
        {nw.dollars}
        <span className="text-text-muted text-lg">{nw.cents}</span>
      </p>
    );
  };

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
        <NetWorthDisplay value={totalNetWorth} />
      </div>
      <div className="bg-background-lighter border border-border rounded-lg p-4">
        <p className="text-text-muted text-xs font-display uppercase tracking-wide mb-1">
          Median Net Worth
        </p>
        <NetWorthDisplay value={medianNetWorth} />
      </div>
    </div>
  );
}
