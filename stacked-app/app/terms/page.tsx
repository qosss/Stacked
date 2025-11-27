import { StaticPageLayout } from "@/components/static/static-page-layout";
import { Section } from "@/components/static/section";

export const metadata = {
  title: "Terms of Service | STACKED",
  description: "Terms and conditions for using STACKED.",
};

export default function TermsPage() {
  return (
    <StaticPageLayout
      title="Terms of Service"
      lastUpdated="November 26, 2024"
    >
      <Section title="Acceptance of Terms">
        <p>
          By accessing and using STACKED, you agree to be bound by these Terms of Service.
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
          <li>You must be at least 18 years old to use STACKED</li>
          <li>You may only create one account per person</li>
          <li>You are responsible for all activity on your account</li>
        </ul>
      </Section>

      <Section title="Account Registration">
        <p>To use STACKED, you must create an account through phone OTP authentication.</p>
        <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
          <li>Each phone number can only be used for one account</li>
          <li>You must provide a unique username during signup</li>
          <li>You are responsible for keeping your phone confidential</li>
        </ul>
      </Section>

      <Section title="Username Policy">
        <div className="bg-accent/10 border-l-4 border-accent p-4 my-6 rounded-sm">
          <p className="font-bold text-accent text-sm mb-2">⚠️ Important: Usernames Are Permanent</p>
          <p className="text-sm">
            Your username cannot be changed after account creation. Choose carefully. This policy creates scarcity and prevents username squatting.
          </p>
        </div>

        <p className="font-bold mb-3">Username Requirements:</p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>3-20 characters long</li>
          <li>Lowercase letters (a-z), numbers (0-9), and underscores (_) only</li>
          <li>Cannot start or end with an underscore</li>
          <li>Must be unique (no duplicates)</li>
        </ul>

        <p className="font-bold mt-6 mb-3">Prohibited Usernames:</p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Offensive, hateful, or discriminatory content</li>
          <li>Trademarked brand names (Apple, Tesla, etc.)</li>
          <li>Impersonation of real people or celebrities</li>
          <li>Reserved system names: admin, stacked, support, help, api, status, blog</li>
        </ul>

        <p className="mt-6">
          We reserve the right to reclaim usernames that violate these policies without notice or compensation.
        </p>
      </Section>

      <Section title="Self-Reported Data Disclaimer">
        <div className="bg-accent/10 border-l-4 border-accent p-4 my-6 rounded-sm">
          <p className="font-bold text-accent text-sm mb-2">⚠️ All Values Are Unverified</p>
          <p className="text-sm">All net worth values on STACKED are self-reported and unverified.</p>
        </div>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Users are solely responsible for accuracy</li>
          <li>STACKED does not verify assets or liabilities</li>
          <li>Nothing constitutes financial advice</li>
        </ul>
      </Section>

      <Section title="Prohibited Conduct">
        <p>
          You agree not to use STACKED in any way that violates these terms or applicable laws:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
          <li>
            <strong>Bots & Automation:</strong> You may not use automated tools, scripts, or bots to access STACKED or submit data
          </li>
          <li>
            <strong>Scraping:</strong> You may not scrape, crawl, or harvest user data from STACKED
          </li>
          <li>
            <strong>Multiple Accounts:</strong> You may not create multiple accounts. One account per person maximum.
          </li>
          <li>
            <strong>Fraud:</strong> You may not submit false, misleading, or fraudulent net worth data
          </li>
          <li>
            <strong>Abuse:</strong> You may not harass, threaten, or abuse other users
          </li>
          <li>
            <strong>Spam:</strong> You may not post spam or promotional content
          </li>
          <li>
            <strong>System Attack:</strong> You may not attempt to hack, exploit, or damage STACKED's systems
          </li>
        </ul>

        <p className="mt-4">
          We monitor for suspicious activity and may suspend or terminate accounts without notice if we suspect violations.
        </p>
      </Section>

      <Section title="Termination">
        <p>
          Your right to use STACKED may be suspended or terminated under these circumstances:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
          <li>Violation of these Terms of Service</li>
          <li>Submission of knowingly false or fraudulent data at scale</li>
          <li>Abuse or harassment of other users</li>
          <li>Attempted hacking, exploitation, or system damage</li>
          <li>Use of bots or automated tools</li>
        </ul>

        <p className="mt-4 font-bold">Your Right to Terminate:</p>
        <p>
          You may delete your account at any time by emailing support@stacked.com with "DELETE MY ACCOUNT" in the subject line. All your data will be permanently removed within 30 days.
        </p>
      </Section>

      <Section title="Disclaimers">
        <p>
          STACKED is provided "AS IS" and "AS AVAILABLE" without warranties of any kind:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
          <li>
            <strong>No warranty of accuracy:</strong> We do not warrant that leaderboard rankings, net worth calculations, or user data are accurate
          </li>
          <li>
            <strong>No warranty of availability:</strong> We do not guarantee uptime or uninterrupted service
          </li>
          <li>
            <strong>No warranty of fitness:</strong> STACKED is not intended for financial decision-making
          </li>
          <li>
            <strong>Not financial advice:</strong> Nothing on STACKED constitutes investment advice or financial guidance
          </li>
          <li>
            <strong>User responsibility:</strong> You use STACKED at your own risk
          </li>
        </ul>
      </Section>

      <Section title="Limitation of Liability">
        <p>
          In no event shall STACKED, its founders, or its operators be liable for any damages arising from your use of the service, including:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
          <li>Direct damages (lost data, service interruptions)</li>
          <li>Indirect damages (lost profits, business interruption)</li>
          <li>Consequential damages (decisions made based on STACKED data)</li>
          <li>Incidental damages (cost of substitute services)</li>
        </ul>

        <p className="mt-4 font-bold">Maximum Liability:</p>
        <p>
          In jurisdictions where liability limitations are permitted, our maximum liability to you shall not exceed the greater of (a) $100 USD or (b) any amount you have paid to STACKED in the past 12 months.
        </p>
      </Section>

      <Section title="Changes to Terms">
        <p>
          We may modify these Terms of Service at any time:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
          <li>We will post updates to this page with a new "Last Updated" date</li>
          <li>For material changes, we will notify users via email or prominent banner</li>
          <li>Your continued use of STACKED after changes constitutes acceptance</li>
          <li>If you do not agree with changes, you may delete your account</li>
        </ul>
      </Section>

      <Section title="Governing Law & Jurisdiction">
        <p>
          These Terms of Service are governed by the laws of Delaware, USA, without regard to conflict of law principles.
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
          <li>Any disputes will be resolved through binding arbitration (not court litigation)</li>
          <li>Arbitration will take place in Wilmington, Delaware</li>
          <li>You waive the right to a jury trial and class action participation</li>
          <li>Either party may appeal arbitration decisions in limited circumstances</li>
        </ul>

        <p className="mt-4">
          For EU users, local consumer protection laws may apply regardless of this clause.
        </p>
      </Section>

      <Section title="Contact & Support">
        <p>
          For questions about these terms or to report violations:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2 mt-3">
          <li>
            <strong>Email:</strong> support@stacked.com
          </li>
          <li>
            <strong>Response time:</strong> 48-72 hours
          </li>
          <li>
            <strong>Account deletion requests:</strong> Email with "DELETE MY ACCOUNT" subject line
          </li>
          <li>
            <strong>Report violations:</strong> Email with "REPORT VIOLATION" subject line
          </li>
        </ul>
      </Section>

      <p className="mt-8 text-text-muted text-xs">
        These Terms of Service are effective as of November 26, 2024. Last updated: November 26, 2024.
      </p>
    </StaticPageLayout>
  );
}