import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface StaticPageLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function StaticPageLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: StaticPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <Header />
      <main className="flex-1 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold mb-3 animate-fade-up">
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-muted text-lg mb-6 animate-fade-up">
              {subtitle}
            </p>
          )}
          {lastUpdated && (
            <p className="text-text-muted text-xs uppercase tracking-wide mb-8">
              Last Updated: {lastUpdated}
            </p>
          )}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
