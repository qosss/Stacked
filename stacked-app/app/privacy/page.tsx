import { StaticPageLayout } from "@/components/layout/static-page-layout";

export default function PrivacyPage() {
  return (
    <StaticPageLayout
      title="Privacy Policy"
      lastUpdated="November 26, 2024"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Privacy Policy", href: "/privacy" },
      ]}
    >
      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            Introduction
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            At STACKED, we are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information.
          </p>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            This policy applies to all users of the STACKED platform and website. By using STACKED, you agree to the collection and use of information in accordance with this policy.
          </p>
          <p className="text-sm leading-relaxed text-text-primary">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a
              href="mailto:hello@stacked.gg"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              hello@stacked.gg
            </a>
            .
          </p>
        </section>

        {/* Information We Collect */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            Information We Collect
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            We collect various types of information to provide and improve our services:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>
              <strong>Phone Number</strong> - Used for account authentication and verification via OTP (one-time password). Encrypted and stored securely.
            </li>
            <li>
              <strong>Username</strong> - Your chosen public identifier on STACKED. Permanent and cannot be changed.
            </li>
            <li>
              <strong>Net Worth Data</strong> - The financial information you voluntarily report. Public and displayed on the leaderboard.
            </li>
            <li>
              <strong>Timestamps</strong> - When you join and when you last update your net worth. Public information.
            </li>
            <li>
              <strong>Device & Browser Information</strong> - For analytics and security purposes (user agent, operating system, browser type). Anonymized and aggregated.
            </li>
            <li>
              <strong>IP Address</strong> - For security, fraud prevention, and rate limiting. Temporary storage only.
            </li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            How We Use Your Information
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>
              <strong>User Authentication</strong> - To verify your identity and secure your account through OTP-based login.
            </li>
            <li>
              <strong>Leaderboard Display</strong> - To show your username, net worth, and rank to other users and create the public leaderboard.
            </li>
            <li>
              <strong>Service Improvements</strong> - To understand usage patterns and improve our features and user experience.
            </li>
            <li>
              <strong>Security & Fraud Prevention</strong> - To detect and prevent unauthorized access, spam, and other security threats.
            </li>
            <li>
              <strong>Future Communications</strong> - For email notifications about rank changes or platform updates (coming soon). You will be able to opt-out.
            </li>
            <li>
              <strong>Verification</strong> - Future integration with Plaid/Teller to verify net worth data (optional, coming soon).
            </li>
          </ul>
        </section>

        {/* What's Public vs Private */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            What's Public vs Private
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            Understanding what information is public and private is important. Here's a clear breakdown:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold text-accent">
                    Information
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-accent">
                    Public
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-accent">
                    Private
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-background-elevated">
                  <td className="py-3 px-4 text-text-primary">Username</td>
                  <td className="py-3 px-4 text-text-primary">✓</td>
                  <td className="py-3 px-4">—</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-elevated">
                  <td className="py-3 px-4 text-text-primary">Net Worth</td>
                  <td className="py-3 px-4 text-text-primary">✓</td>
                  <td className="py-3 px-4">—</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-elevated">
                  <td className="py-3 px-4 text-text-primary">Rank/Position</td>
                  <td className="py-3 px-4 text-text-primary">✓</td>
                  <td className="py-3 px-4">—</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-elevated">
                  <td className="py-3 px-4 text-text-primary">Last Updated</td>
                  <td className="py-3 px-4 text-text-primary">✓</td>
                  <td className="py-3 px-4">—</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-elevated">
                  <td className="py-3 px-4 text-text-primary">OG/Early Badge</td>
                  <td className="py-3 px-4 text-text-primary">✓</td>
                  <td className="py-3 px-4">—</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-elevated">
                  <td className="py-3 px-4 text-text-primary">
                    Verification Status
                  </td>
                  <td className="py-3 px-4 text-text-primary">✓</td>
                  <td className="py-3 px-4">—</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-elevated">
                  <td className="py-3 px-4 text-text-primary">Phone Number</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4 text-text-primary">✓</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-elevated">
                  <td className="py-3 px-4 text-text-primary">OTP Codes</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4 text-text-primary">✓</td>
                </tr>
                <tr className="border-b border-border hover:bg-background-elevated">
                  <td className="py-3 px-4 text-text-primary">IP Address</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4 text-text-primary">✓</td>
                </tr>
                <tr className="hover:bg-background-elevated">
                  <td className="py-3 px-4 text-text-primary">Device Data</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4 text-text-primary">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-relaxed text-text-primary">
            <strong>Why is some data public?</strong> The public data (username, net worth, rank) is essential to how STACKED works as a public leaderboard. This transparency is core to our platform's purpose. Your private data is protected because it's not necessary for the platform to function and revealing it could compromise your security.
          </p>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            Data Security
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            We take data security seriously and implement industry-standard measures to protect your information:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>
              <strong>Encryption in Transit</strong> - All data transmitted between your device and our servers is encrypted using HTTPS/TLS protocols.
            </li>
            <li>
              <strong>Encryption at Rest</strong> - Sensitive data (phone numbers) is encrypted at rest using AES-256 encryption.
            </li>
            <li>
              <strong>Password Hashing</strong> - Phone numbers are hashed using bcrypt before storage.
            </li>
            <li>
              <strong>OTP Security</strong> - One-time passwords are time-limited (typically 10 minutes) and hashed before storage.
            </li>
            <li>
              <strong>Regular Audits</strong> - We conduct regular security audits and penetration testing.
            </li>
            <li>
              <strong>Future Compliance</strong> - SOC 2 Type II compliance is planned for 2025.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-text-primary">
            Despite our best efforts, no system is completely secure. If you suspect a security breach, please contact us immediately at{" "}
            <a
              href="mailto:hello@stacked.gg"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              hello@stacked.gg
            </a>
            .
          </p>
        </section>

        {/* Third-Party Services */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            Third-Party Services
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            STACKED uses third-party services to operate and improve our platform. We carefully select partners that maintain similar privacy and security standards:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>
              <strong>Supabase</strong> - Our database and authentication provider. Your data is stored in their secure cloud infrastructure.{" "}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:opacity-80 transition-opacity underline"
              >
                View Supabase Privacy Policy
              </a>
            </li>
            <li>
              <strong>Plaid/Teller</strong> (Coming soon) - Optional verification service to connect your bank accounts.{" "}
              <a
                href="https://plaid.com/legal/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:opacity-80 transition-opacity underline"
              >
                Plaid Privacy Policy
              </a>
              {" / "}
              <a
                href="https://www.teller.io/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:opacity-80 transition-opacity underline"
              >
                Teller Privacy Policy
              </a>
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-text-primary">
            <strong>Important:</strong> We do not sell your data to third parties or for advertising purposes. We only share data necessary for the services listed above.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            Your Rights (GDPR & CCPA Compliance)
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            Depending on your location, you have various rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>
              <strong>Right to Access</strong> - You can request a copy of all personal data we hold about you.
            </li>
            <li>
              <strong>Right to Update</strong> - You can update your net worth and username at any time through your account.
            </li>
            <li>
              <strong>Right to Data Portability</strong> - You can request your data in a portable format (coming soon).
            </li>
            <li>
              <strong>Right to Deletion</strong> - You can request deletion of your account and associated data (coming soon).
            </li>
            <li>
              <strong>Right to Opt-Out</strong> - You can opt-out of marketing communications and non-essential analytics.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-text-primary">
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:hello@stacked.gg"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              hello@stacked.gg
            </a>
            . We will respond to your request within 30 days.
          </p>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            Data Retention
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            We retain your data for as long as necessary to provide our services:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>
              <strong>Active Accounts</strong> - Data is retained indefinitely while your account is active.
            </li>
            <li>
              <strong>Deleted Accounts</strong> - Data is retained for 30 days after account deletion to allow recovery. After 30 days, all data is permanently deleted.
            </li>
            <li>
              <strong>Backups</strong> - Backup copies are retained for up to 90 days for disaster recovery purposes.
            </li>
            <li>
              <strong>Analytics Data</strong> - Aggregated, anonymized analytics data is retained for up to 2 years.
            </li>
          </ul>
        </section>

        {/* Changes to This Policy */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            Changes to This Policy
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>Posting the updated policy on this page with a new "Last Updated" date</li>
            <li>
              Sending an email notification to the email associated with your account (for significant changes)
            </li>
            <li>Displaying a prominent banner on the platform</li>
          </ul>
          <p className="text-sm leading-relaxed text-text-primary">
            Your continued use of STACKED following the posting of changes means you accept and agree to the changes.
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}
