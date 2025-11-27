import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <header className="border-b border-border p-6">
        <Link href="/" className="font-display text-2xl font-bold">
          STACKED
        </Link>
      </header>
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-6">
        {children}
      </main>
    </div>
  );
}
