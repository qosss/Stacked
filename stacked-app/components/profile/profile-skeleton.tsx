import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="max-w-md w-full mx-auto">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <Skeleton className="h-32 w-32 rounded-full mx-auto" />
        <Skeleton className="h-10 w-48 mx-auto mt-4" />
        <Skeleton className="h-4 w-32 mx-auto mt-2" />
      </div>

      {/* Rank Banner */}
      <Skeleton className="h-24 w-full rounded-lg mb-6" />

      {/* Net Worth */}
      <Skeleton className="h-24 w-full rounded-lg mb-6" />

      {/* Tags */}
      <div className="flex justify-center gap-2 mb-6">
        <Skeleton className="h-8 w-12 rounded" />
        <Skeleton className="h-8 w-12 rounded" />
      </div>

      {/* Join Date */}
      <div className="text-center mb-8">
        <Skeleton className="h-4 w-40 mx-auto" />
      </div>

      {/* Back Button */}
      <Skeleton className="h-10 w-full rounded" />
    </div>
  );
}
