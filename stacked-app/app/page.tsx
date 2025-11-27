import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StatsBar } from "@/components/leaderboard/stats-bar";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { PageTransition } from "@/components/ui/page-transition";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <Header />
      <PageTransition>
        <main className="flex-1 flex flex-col px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="max-w-5xl w-full mx-auto">
          <div className="mb-8 md:mb-12">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-2 animate-fade-up">
              Show Your Stack
            </h1>
            <p className="text-text-muted text-sm sm:text-base md:text-lg mb-6 md:mb-8 animate-fade-up">
              A global net worth leaderboard for builders, founders, and the financially curious
            </p>
          </div>

          <StatsBar />
          <LeaderboardTable />
        </div>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}
