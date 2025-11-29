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
import { SocialLinksInput } from "@/components/auth/social-links-input";
import { Badge } from "@/components/ui/badge";
import { RankChangeIndicator } from "@/components/ui/rank-change-indicator";
import { PageTransition } from "@/components/ui/page-transition";
import { ProfileSkeleton } from "@/components/profile/profile-skeleton";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { XLogo } from "@/components/ui/x-logo";
import { InstagramLogo } from "@/components/ui/instagram-logo";
import { LinkedInLogo } from "@/components/ui/linkedin-logo";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, updateNetWorth, updateSocials, isLoading } = useAuth();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showSocialsModal, setShowSocialsModal] = useState(false);
  const [newNetWorth, setNewNetWorth] = useState("");
  const [socialX, setSocialX] = useState("");
  const [socialInstagram, setSocialInstagram] = useState("");
  const [socialLinkedIn, setSocialLinkedIn] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [socialsError, setSocialsError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingSocials, setIsUpdatingSocials] = useState(false);

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

  const handleUpdateSocials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSocialsError("");

    setIsUpdatingSocials(true);
    const success = await updateSocials({
      x: socialX || undefined,
      instagram: socialInstagram || undefined,
      linkedin: socialLinkedIn || undefined,
      bio: bio || undefined,
    });
    setIsUpdatingSocials(false);

    if (success) {
      setShowSocialsModal(false);
    } else {
      setSocialsError("Failed to update social links");
    }
  };

  const openSocialsModal = () => {
    setSocialX(user?.socialX || "");
    setSocialInstagram(user?.socialInstagram || "");
    setSocialLinkedIn(user?.socialLinkedIn || "");
    setBio(user?.bio || "");
    setSocialsError("");
    setShowSocialsModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <Header />

      <PageTransition>
        <main className="flex-1 flex flex-col items-center px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-4xl w-full">
          {/* Welcome Banner */}
          <div className="bg-background-lighter border border-border rounded-lg p-4 sm:p-6 mb-6">
            <p className="text-text-muted text-sm mb-1">Welcome back,</p>
            <p className="text-xl sm:text-2xl font-bold font-display text-accent truncate">
              <span className="break-words">{user.displayName}</span>
              {user.isVerified && <Badge variant="verified" className="ml-2 align-middle">Verified</Badge>}
              {user.isOG && <Badge variant="og" className="ml-2 align-middle">OG</Badge>}
              {user.isEarly && <Badge variant="early" className="ml-2 align-middle">Early</Badge>}
            </p>
            <p className="text-text-muted text-sm">@{user.username}</p>
          </div>

          {/* Two Column Grid for Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Profile & Stats */}
            <div className="space-y-6">
              {/* Profile Info */}
              <div className="text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <Avatar
                    size="lg"
                    initial={user.username.charAt(0).toUpperCase()}
                  />
                  <div className="mt-4 md:mt-0">
                    <h1 className="text-xl sm:text-2xl font-bold font-display break-all">
                      @{user.username}
                    </h1>
                    <p className="text-text-muted text-sm">
                      Joined {user.joinedDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rank & Net Worth - side by side on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  } rounded-lg p-4 sm:p-6 text-center`}
                >
                  <p className={`text-3xl sm:text-4xl font-bold font-display mb-1 ${getRankColor(rank)}`}>
                    <RankChangeIndicator currentRank={rank} previousRank={user.previousRank} size="md" />
                    #{rank}
                  </p>
                  <p className="text-text-muted text-xs sm:text-sm">Global Rank</p>
                </div>

                {/* Net Worth */}
                <div className="bg-background-lighter border border-border rounded-lg p-4 sm:p-6 text-center">
                  <p className="text-3xl sm:text-4xl font-bold font-display text-accent mb-1">
                    {(() => {
                      const nw = formatNetWorthWithCents(user.netWorth);
                      return (
                        <>
                          {nw.dollars}
                          <span className="text-text-muted text-lg sm:text-2xl">{nw.cents}</span>
                        </>
                      );
                    })()}
                  </p>
                  <p className="text-text-muted text-xs sm:text-sm">Net Worth</p>
                </div>
              </div>
            </div>

            {/* Right Column - Bio, Socials, Actions */}
            <div className="space-y-6">
              {/* Bio */}
              {user.bio ? (
                <div className="bg-background-lighter border border-border rounded-lg p-4 sm:p-6">
                  <h3 className="text-sm font-bold font-display text-text-muted mb-2">Bio</h3>
                  <p className="text-text text-sm italic break-words">&ldquo;{user.bio}&rdquo;</p>
                </div>
              ) : (
                <div className="bg-background-lighter border border-dashed border-border rounded-lg p-4 sm:p-6">
                  <p className="text-text-muted text-sm text-center">No bio yet. Add one to tell others about yourself!</p>
                </div>
              )}

              {/* Social Links */}
              <div className="bg-background-lighter border border-border rounded-lg p-4 sm:p-6">
                <h3 className="text-sm font-bold font-display text-text-muted mb-3">Social Links</h3>
                {(user.socialX || user.socialInstagram || user.socialLinkedIn) ? (
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {user.socialX && (
                      <a
                        href={`https://x.com/${user.socialX}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-muted hover:text-text transition-colors max-w-[150px]"
                      >
                        <XLogo className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate">@{user.socialX}</span>
                      </a>
                    )}
                    {user.socialInstagram && (
                      <a
                        href={`https://instagram.com/${user.socialInstagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-muted hover:text-text transition-colors max-w-[150px]"
                      >
                        <InstagramLogo className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate">@{user.socialInstagram}</span>
                      </a>
                    )}
                    {user.socialLinkedIn && (
                      <a
                        href={`https://linkedin.com/in/${user.socialLinkedIn}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-muted hover:text-text transition-colors max-w-[180px]"
                      >
                        <LinkedInLogo className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate">/in/{user.socialLinkedIn}</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <p className="text-text-muted text-sm mb-4">
                    No social links added yet
                  </p>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={openSocialsModal}
                >
                  {(user.socialX || user.socialInstagram || user.socialLinkedIn || user.bio) ? "Edit Profile" : "Add Bio & Socials"}
                </Button>
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
                {!user.isVerified && (
                  <Link href="/verify" className="block">
                    <Button variant="ghost" className="w-full">
                      Verify Net Worth
                    </Button>
                  </Link>
                )}
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

      {/* Social Links Modal */}
      <Modal isOpen={showSocialsModal} onClose={() => setShowSocialsModal(false)}>
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold font-display mb-6">
              Social Links
            </h2>

            <form onSubmit={handleUpdateSocials} className="space-y-6">
              <SocialLinksInput
                xValue={socialX}
                instagramValue={socialInstagram}
                linkedinValue={socialLinkedIn}
                bioValue={bio}
                onXChange={setSocialX}
                onInstagramChange={setSocialInstagram}
                onLinkedInChange={setSocialLinkedIn}
                onBioChange={setBio}
                disabled={isUpdatingSocials}
              />

              {socialsError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-3 py-2 rounded">
                  {socialsError}
                </div>
              )}

              <div className="space-y-2">
                <Button
                  type="submit"
                  variant="primary"
                  loading={isUpdatingSocials}
                  className="w-full"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowSocialsModal(false)}
                  disabled={isUpdatingSocials}
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
