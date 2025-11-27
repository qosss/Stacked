import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex justify-between items-center border-b border-border p-6 animate-fade-down">
      <Link
        href="/"
        className="font-display text-2xl font-bold tracking-wider hover:text-accent transition-colors"
      >
        STACKED
      </Link>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          Log in
        </Button>
        <Button variant="primary" size="sm">
          Join
        </Button>
      </div>
    </header>
  );
}
