import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <header className="border-b border-border p-6">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo size="md" />
        </Link>
      </header>
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-6">
        {children}
      </main>
    </div>
  );
}
