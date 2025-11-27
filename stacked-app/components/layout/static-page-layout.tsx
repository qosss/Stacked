import { Header } from "./header";
import { Footer } from "./footer";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";

interface StaticPageLayoutProps {
  title: string;
  lastUpdated?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
}

export function StaticPageLayout({
  title,
  lastUpdated,
  breadcrumbs,
  children,
}: StaticPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <Header />
      <main className="flex-1 flex flex-col px-6 py-12">
        <div className="max-w-5xl w-full mx-auto">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <h1 className="font-display text-4xl font-bold text-text-primary mb-2 animate-fade-up">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-text-muted text-xs mb-8">
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
