import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t border-border mt-8 py-8 text-center animate-fade-in">
      <div className="mb-4">
        <Logo size="sm" />
      </div>
      <div className="flex justify-center gap-8 mb-3">
        <Link
          href="/privacy"
          className="text-text-muted hover:text-accent text-xs transition-colors"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="text-text-muted hover:text-accent text-xs transition-colors"
        >
          Terms
        </Link>
        <Link
          href="/faq"
          className="text-text-muted hover:text-accent text-xs transition-colors"
        >
          FAQ
        </Link>
      </div>
      <p className="text-[#333] text-[10px]">
        All values self-reported. Verification coming soon.
      </p>
    </footer>
  );
}
