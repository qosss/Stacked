import { InfoIcon } from "lucide-react";

export default function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="w-full">
        <div className="bg-accent-dim text-accent text-sm p-3 px-5 rounded-sm flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-display font-bold text-2xl mb-4">Dashboard</h2>
        <p className="text-text-muted text-sm">Dashboard content coming soon...</p>
      </div>
    </div>
  );
}
