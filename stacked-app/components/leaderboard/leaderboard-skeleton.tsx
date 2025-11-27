import { Skeleton } from "@/components/ui/skeleton";

export function LeaderboardSkeleton() {
  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-background-lighter border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider w-12">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-text-muted uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-text-muted uppercase tracking-wider">
                Net Worth
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-text-muted uppercase tracking-wider w-24">
                Tags
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr
                key={i}
                className="border-b border-border hover:bg-background-lighter transition-colors"
              >
                <td className="px-6 py-4 text-sm">
                  <Skeleton className="h-6 w-6" />
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-right">
                  <Skeleton className="h-4 w-20 ml-auto" />
                </td>
                <td className="px-6 py-4 text-sm text-right">
                  <Skeleton className="h-6 w-12 ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
