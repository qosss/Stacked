"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { getUserRank, formatNetWorth } from "@/lib/data/users";
import { getRankColor, formatNetWorthWithCents } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { NetWorthInput } from "@/components/auth/networth-input";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/ui/page-transition";
import { ProfileSkeleton } from "@/components/profile/profile-skeleton";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, updateNetWorth, isLoading } = useAuth();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newNetWorth, setNewNetWorth] = useState("");
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-background-deep">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <ProfileSkeleton />
        </main>
      </div>
    );
  }

  const rank = getUserRank(user.id);

  const handleUpdateNetWorth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const numericValue = parseInt(newNetWorth.replace(/,/g, ""));
    if (!newNetWorth || isNaN(numericValue) || numericValue <= 0) {
      setError("Please enter a valid net worth amount");
      return;
    }

    setIsUpdating(true);
    const success = await updateNetWorth(numericValue);
    setIsUpdating(false);

    if (success) {
      setShowUpdateModal(false);
      setNewNetWorth("");
    } else {
      setError("Failed to update net worth");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <Header />

      <PageTransition>
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          {/* Welcome Banner */}
          <div className="bg-background-lighter border border-border rounded-lg p-6 mb-6">
            <p className="text-text-muted text-sm mb-1">Welcome back,</p>
            <p className="text-2xl font-bold font-display text-accent">
              @{user.username}
            </p>
          </div>

          {/* Profile Info */}
          <div className="text-center mb-8">
            <Avatar
              size="lg"
              initial={user.username.charAt(0).toUpperCase()}
            />
            <h1 className="text-2xl font-bold font-display mt-4">
              @{user.username}
            </h1>
            <p className="text-text-muted text-sm mt-2">{user.phone}</p>
          </div>

          {/* Rank Banner */}
          <div
            className={`border-2 ${
              rank === 1
                ? "border-accent bg-accent/5"
                : rank === 2
                  ? "border-gray-400 bg-gray-400/5"
                  : rank === 3
                    ? "border-orange-500 bg-orange-500/5"
                    : "border-border bg-background-lighter"
            } rounded-lg p-6 text-center mb-6`}
          >
            <p className={`text-4xl font-bold font-display mb-2 ${getRankColor(rank)}`}>
              #{rank}
            </p>
            <p className="text-text-muted text-sm">Your Global Rank</p>
          </div>

          {/* Net Worth */}
          <div className="bg-background-lighter border border-border rounded-lg p-6 text-center mb-6">
            <p className="text-text-muted text-sm mb-2">Net Worth</p>
            <p className="text-4xl font-bold font-display text-accent">
              {(() => {
                const nw = formatNetWorthWithCents(user.netWorth);
                return (
                  <>
                    {nw.dollars}
                    <span className="text-text-muted text-2xl">{nw.cents}</span>
                  </>
                );
              })()}
            </p>
          </div>

          {/* Badges */}
          <div className="flex justify-center gap-2 mb-6">
            {user.isOG && <Badge variant="og">OG</Badge>}
            {user.isEarly && <Badge variant="early">Early</Badge>}
          </div>

          {/* Join Date */}
          <div className="text-center mb-8">
            <p className="text-text-muted text-sm">
              Joined {user.joinedDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Account Settings Placeholder */}
          <div className="bg-background-lighter border border-border rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold font-display mb-2">Account Settings</h3>
            <p className="text-text-muted text-sm">
              Coming soon: Manage your account preferences, notifications, and privacy settings
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              variant="primary"
              onClick={() => {
                setShowUpdateModal(true);
                setNewNetWorth(user.netWorth.toLocaleString());
              }}
              className="w-full"
            >
              Update Net Worth
            </Button>
            <Link href={`/u/${user.username}`} className="block">
              <Button variant="ghost" className="w-full">
                View Profile
              </Button>
            </Link>
            <Button
              variant="danger"
              onClick={handleLogout}
              className="w-full"
            >
              Log Out
            </Button>
          </div>
        </div>
        </main>
      </PageTransition>

      <Footer />

      {/* Update Net Worth Modal */}
      <Modal isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold font-display mb-6">
              Update Net Worth
            </h2>

            <form onSubmit={handleUpdateNetWorth} className="space-y-6">
              <NetWorthInput
                value={newNetWorth}
                onChange={setNewNetWorth}
                disabled={isUpdating}
              />

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-3 py-2 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Button
                  type="submit"
                  variant="primary"
                  loading={isUpdating}
                  className="w-full"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowUpdateModal(false)}
                  disabled={isUpdating}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
      </Modal>
    </div>
  );
}
