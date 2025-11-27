import { StaticPageLayout } from "@/components/layout/static-page-layout";

export default function ContactPage() {
  return (
    <StaticPageLayout
      title="Get in Touch"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact", href: "/contact" },
      ]}
    >
      <div className="max-w-md mx-auto text-center space-y-8">
        <p className="text-text-secondary text-lg">
          Have questions, feedback, or found a bug? We'd love to hear from you.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-text-muted">Send us an email at:</p>
          <a
            href="mailto:hello@stacked.gg"
            className="inline-block text-3xl font-display font-bold text-accent hover:opacity-80 transition-opacity underline"
          >
            hello@stacked.gg
          </a>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-xs text-text-muted mb-2">Expected Response Time</p>
          <p className="text-sm text-text-primary">
            We typically respond within 24-48 hours during business days.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-xs text-text-muted mb-3 uppercase tracking-wide">
            For Account Issues
          </p>
          <p className="text-sm text-text-primary">
            Please include your username in your email so we can assist you more quickly.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-xs text-text-muted mb-3 uppercase tracking-wide">
            Quick Links
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/privacy"
              className="text-sm text-accent hover:opacity-80 transition-opacity underline"
            >
              Privacy Policy
            </a>
            <span className="text-text-muted">·</span>
            <a
              href="/terms"
              className="text-sm text-accent hover:opacity-80 transition-opacity underline"
            >
              Terms of Service
            </a>
            <span className="text-text-muted">·</span>
            <a
              href="/faq"
              className="text-sm text-accent hover:opacity-80 transition-opacity underline"
            >
              FAQ
            </a>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
}
