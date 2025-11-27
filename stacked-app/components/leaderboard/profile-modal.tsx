"use client";

import { User, getUserRank } from "@/lib/data/users";
import { formatNetWorthWithCents } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { Avatar } from "@/components/ui/avatar";
import { Tag } from "@/components/ui/tag";
import Link from "next/link";

interface ProfileModalProps {
  user: User;
  onClose: () => void;
}

export function ProfileModal({ user, onClose }: ProfileModalProps) {
  const rank = getUserRank(user.id);

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <Avatar size="lg" initial={user.username.charAt(0).toUpperCase()} />
          <h2 className="text-2xl font-bold font-display mt-4">
            @{user.username}
          </h2>
          <p className="text-sm text-text-muted mt-1">{user.phone}</p>
        </div>

        <div className="bg-background-lighter border border-border rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-text-muted text-sm">Net Worth</span>
            <span className="text-2xl font-bold text-accent">
              {(() => {
                const nw = formatNetWorthWithCents(user.netWorth);
                return (
                  <>
                    {nw.dollars}
                    <span className="text-text-muted text-lg">{nw.cents}</span>
                  </>
                );
              })()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted text-sm">Rank</span>
            <span className="text-2xl font-bold text-accent">#{rank}</span>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {user.isOG && <Tag variant="og">OG</Tag>}
          {user.isEarly && <Tag variant="early">Early</Tag>}
        </div>

        <div className="text-sm text-text-muted text-center mb-4">
          Joined {user.joinedDate.toLocaleDateString("en-US")}
        </div>

        <Link
          href={`/u/${user.username}`}
          className="block w-full text-center bg-accent text-text-inverse font-bold py-2 rounded hover:opacity-90 transition-opacity"
        >
          View Full Profile
        </Link>
      </div>
    </Modal>
  );
}
