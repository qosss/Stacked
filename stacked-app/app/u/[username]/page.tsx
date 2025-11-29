"use client";

import { use } from "react";
import { getUserByUsername, getUserRank, formatNetWorth } from "@/lib/data/users";
import { getRankColor, formatNetWorthWithCents } from "@/lib/utils";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RankChangeIndicator } from "@/components/ui/rank-change-indicator";
import { PageTransition } from "@/components/ui/page-transition";
import { ProfileSkeleton } from "@/components/profile/profile-skeleton";
import { XLogo } from "@/components/ui/x-logo";
import { InstagramLogo } from "@/components/ui/instagram-logo";
import { LinkedInLogo } from "@/components/ui/linkedin-logo";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = use(params);
  const user = getUserByUsername(username);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background-deep">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-display mb-2">User Not Found</h1>
            <p className="text-text-muted mb-6">We couldn't find a user with that username.</p>
            <Link href="/" className="text-accent hover:opacity-80">
              ← Back to Leaderboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const rank = getUserRank(user.id);

  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <Header />

      <PageTransition>
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-md w-full">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <Avatar
              size="lg"
              initial={user.username.charAt(0).toUpperCase()}
              className="mx-auto"
            />
            <h1 className="text-3xl font-bold font-display mt-4">
              {user.displayName}
              {user.isVerified && <Badge variant="verified" className="ml-2 align-middle">Verified</Badge>}
              {user.isOG && <Badge variant="og" className="ml-2 align-middle">OG</Badge>}
              {user.isEarly && <Badge variant="early" className="ml-2 align-middle">Early</Badge>}
            </h1>
            <p className="text-text-muted text-sm mt-1">@{user.username}</p>

            {/* Bio */}
            {user.bio && (
              <p className="text-text text-sm italic mt-3 max-w-xs mx-auto">&ldquo;{user.bio}&rdquo;</p>
            )}

            {/* Social Links */}
            {(user.socialX || user.socialInstagram || user.socialLinkedIn) && (
              <div className="flex flex-wrap justify-center gap-4 mt-3">
                {user.socialX && (
                  <a
                    href={`https://x.com/${user.socialX}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-text-muted hover:text-text transition-colors"
                  >
                    <XLogo className="h-4 w-4" />
                    <span className="text-sm">@{user.socialX}</span>
                  </a>
                )}
                {user.socialInstagram && (
                  <a
                    href={`https://instagram.com/${user.socialInstagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-text-muted hover:text-text transition-colors"
                  >
                    <InstagramLogo className="h-4 w-4" />
                    <span className="text-sm">@{user.socialInstagram}</span>
                  </a>
                )}
                {user.socialLinkedIn && (
                  <a
                    href={`https://linkedin.com/in/${user.socialLinkedIn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-text-muted hover:text-text transition-colors"
                  >
                    <LinkedInLogo className="h-4 w-4" />
                    <span className="text-sm">/in/{user.socialLinkedIn}</span>
                  </a>
                )}
              </div>
            )}
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
              <RankChangeIndicator currentRank={rank} previousRank={user.previousRank} size="md" />
              #{rank}
            </p>
            <p className="text-text-muted text-sm">Global Rank</p>
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

          {/* Actions */}
          <div className="space-y-2">
            <Link
              href="/"
              className="block w-full text-center bg-accent text-text-inverse font-bold py-2 rounded hover:opacity-90 transition-opacity"
            >
              Back to Leaderboard
            </Link>
          </div>
          </div>
        </main>
      </PageTransition>

      <Footer />
    </div>
  );
}
