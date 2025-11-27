import { getUserByUsername, getUserRank, formatNetWorth } from "@/lib/data/users";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Tag } from "@/components/ui/tag";
import { PageTransition } from "@/components/ui/page-transition";
import { ProfileSkeleton } from "@/components/profile/profile-skeleton";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params;
  const user = getUserByUsername(username);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background-deep">
        <header className="border-b border-border p-6">
          <Link href="/" className="font-display text-2xl font-bold">
            STACKED
          </Link>
        </header>
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

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-accent";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-orange-500";
    return "text-text";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <header className="border-b border-border p-6">
        <Link href="/" className="font-display text-2xl font-bold">
          STACKED
        </Link>
      </header>

      <PageTransition>
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-md w-full">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <Avatar
              size="lg"
              initial={user.username.charAt(0).toUpperCase()}
            />
            <h1 className="text-3xl font-bold font-display mt-4">
              {user.username}
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
            <p className="text-text-muted text-sm">Global Rank</p>
          </div>

          {/* Net Worth */}
          <div className="bg-background-lighter border border-border rounded-lg p-6 text-center mb-6">
            <p className="text-text-muted text-sm mb-2">Net Worth</p>
            <p className="text-4xl font-bold font-display text-accent">
              {formatNetWorth(user.netWorth)}
            </p>
          </div>

          {/* Tags */}
          <div className="flex justify-center gap-2 mb-6">
            {user.isOG && <Tag variant="og">OG</Tag>}
            {user.isEarly && <Tag variant="early">Early</Tag>}
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
              className="block w-full text-center bg-accent text-background font-bold py-2 rounded hover:opacity-90 transition-opacity"
            >
              Back to Leaderboard
            </Link>
          </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
