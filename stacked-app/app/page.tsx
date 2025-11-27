import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StatsBar } from "@/components/leaderboard/stats-bar";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <Header />
      <main className="flex-1 flex flex-col px-6 py-12">
        <div className="max-w-5xl w-full mx-auto">
          <div className="mb-12">
            <h1 className="font-display text-5xl font-bold text-text mb-2 animate-fade-up">
              Show Your Stack
            </h1>
            <p className="text-text-muted text-lg mb-8 animate-fade-up">
              A global net worth leaderboard for builders, founders, and the financially curious
            </p>
          </div>

          <StatsBar />
          <LeaderboardTable />
        </div>
      </main>
      <Footer />
    </div>
  );
}
