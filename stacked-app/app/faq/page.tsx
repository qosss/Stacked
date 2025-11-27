import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs: AccordionItem[] = [
    {
      question: "What is STACKED?",
      answer: (
        <div className="space-y-4">
          <p>
            STACKED is a global public leaderboard where people voluntarily report their net worth and compete for position. It's built on the principle of transparency and community-driven wealth tracking.
          </p>
          <p>
            Think of it as showing your financial "stack" to the world - a simple, direct way to compare wealth with others globally. All values are self-reported and unverified in the MVP phase, but a verification system is coming soon.
          </p>
          <p>
            Our tagline is <strong>"SHOW YOUR STACK"</strong> - capturing that new money energy where transparency and peer comparison drive motivation and engagement.
          </p>
        </div>
      ),
    },
    {
      question: "How do I calculate my net worth?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>Net Worth = Total Assets - Total Liabilities</strong>
          </p>
          <p>
            <strong>Assets include:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Cash and savings accounts</li>
            <li>Investments (stocks, bonds, index funds)</li>
            <li>Cryptocurrency</li>
            <li>Real estate properties (market value)</li>
            <li>Vehicles</li>
            <li>Jewelry, art, and collectibles</li>
            <li>Business equity</li>
          </ul>
          <p>
            <strong>Liabilities include:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Mortgages</li>
            <li>Personal loans</li>
            <li>Credit card debt</li>
            <li>Student loans</li>
            <li>Car loans</li>
          </ul>
          <p>
            For help calculating your net worth, check out resources like{" "}
            <a
              href="https://www.investopedia.com/terms/n/networth.asp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              Investopedia's Net Worth Guide
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      question: "Are the numbers verified?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>Not yet.</strong> In the current MVP phase, all net worth values are self-reported and unverified. Users report their own numbers without any validation from STACKED.
          </p>
          <p>
            All unverified users will display an "Unverified" status badge next to their name.
          </p>
          <p>
            <strong>Coming Soon:</strong> We're building a verification system using{" "}
            <a
              href="https://plaid.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              Plaid
            </a>
            {" and "}
            <a
              href="https://teller.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              Teller
            </a>{" "}
            that will let you securely connect your bank accounts to verify your net worth. This will be optional - you can stay unverified if you prefer privacy.
          </p>
        </div>
      ),
    },
    {
      question: "Can I change my username?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>No, usernames are permanent.</strong> Once you create a username, it cannot be changed. This is by design - permanence creates scarcity and ensures your identity on STACKED is truly yours.
          </p>
          <p>
            Think carefully when choosing your username during signup. Your username becomes part of your identity on the platform and on the public leaderboard.
          </p>
          <p>
            In extreme cases (like if your account was compromised), you can contact us at{" "}
            <a
              href="mailto:hello@stacked.gg"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              hello@stacked.gg
            </a>{" "}
            to discuss options.
          </p>
        </div>
      ),
    },
    {
      question: "Is my phone number public?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>No, your phone number is never public.</strong> It is completely private and encrypted in our database.
          </p>
          <p>
            Your phone number is only used for authentication via one-time password (OTP) login. It is never displayed on your profile, never shared with other users, and never shared with third parties.
          </p>
          <p>
            For details on how we protect your phone number, see our{" "}
            <a
              href="/privacy"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      question: "How do I update my net worth?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>To update your net worth:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Click the dropdown menu in the header (you must be logged in)
            </li>
            <li>Select "Update Net Worth"</li>
            <li>Enter your new net worth value</li>
            <li>Click "Save Changes"</li>
          </ol>
          <p>
            <strong>Alternative:</strong> Go to your account dashboard at{" "}
            <a
              href="/me"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              /me
            </a>{" "}
            and click the "Update Net Worth" button.
          </p>
          <p>
            Your update will be reflected immediately on the leaderboard. We track your update history for transparency, so you can see when your net worth has changed.
          </p>
        </div>
      ),
    },
    {
      question: "What does 'OG' mean?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>OG</strong> stands for "Original" and is a badge for the first 1,000 users to join STACKED.
          </p>
          <p>
            <strong>Badge Tiers:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>OG Badge:</strong> Users #1-1,000 (first 1,000)
            </li>
            <li>
              <strong>EARLY Badge:</strong> Users #1,001-5,000 (next 4,000)
            </li>
          </ul>
          <p>
            These badges are <strong>permanent and cannot be earned later.</strong> They're displayed on your profile and next to your username on the leaderboard, marking you as an early supporter of STACKED.
          </p>
        </div>
      ),
    },
    {
      question: "Can I delete my account?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>Account deletion is coming soon.</strong> In the MVP phase, account deletion is not yet available.
          </p>
          <p>
            <strong>For now:</strong> If you want to delete your account, please contact us at{" "}
            <a
              href="mailto:hello@stacked.gg"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              hello@stacked.gg
            </a>{" "}
            and we'll help you manually remove your data.
          </p>
          <p>
            <strong>When the feature launches:</strong> You'll be able to delete your account directly through the app. You'll have a 30-day grace period to recover your data before permanent deletion.
          </p>
          <p>
            <strong>Data export:</strong> We're also building a data export feature so you can download a copy of all your information before deletion.
          </p>
        </div>
      ),
    },
    {
      question: "How is rank calculated?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>Rank is simple:</strong> Users are ranked by net worth, highest first.
          </p>
          <p>
            <strong>Ranking rules:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Primary Sort:</strong> Net worth (highest first)
            </li>
            <li>
              <strong>Tie Breaker:</strong> If two users have the same net worth, the user who joined first ranks higher
            </li>
            <li>
              <strong>Real-time Updates:</strong> Rank updates immediately when you update your net worth
            </li>
          </ul>
          <p>
            <strong>Rank Badges:</strong> The top 3 users get special medal colors:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>🥇 #1: Gold</li>
            <li>🥈 #2: Silver</li>
            <li>🥉 #3: Bronze</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Can I have a negative net worth?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>Yes, absolutely.</strong> STACKED fully supports negative net worth values. If you have more liabilities than assets, your net worth will be negative.
          </p>
          <p>
            <strong>Supported Range:</strong> -$999,999,999,999.99 to +$999,999,999,999.99
          </p>
          <p>
            Users with negative net worth appear on the leaderboard ranked lowest (at the bottom), but they're part of the community. There's no judgment on STACKED - everyone's financial journey is different.
          </p>
          <p>
            Whether you're paying off debt or building wealth, you're welcome on STACKED.
          </p>
        </div>
      ),
    },
    {
      question: "What currencies are supported?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>MVP Phase:</strong> USD only. All net worth values must be entered in US dollars.
          </p>
          <p>
            <strong>Coming Soon:</strong> Multi-currency support is planned for a future release. You'll be able to select your currency and convert values automatically.
          </p>
          <p>
            <strong>For now:</strong> If your net worth is in another currency, please convert it to USD using current exchange rates and enter the USD value.
          </p>
        </div>
      ),
    },
    {
      question: "How does verification work?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>Current Status:</strong> All users are unverified in the MVP phase. No verification is required to join or use STACKED.
          </p>
          <p>
            <strong>Coming Soon:</strong> We're building a verification system that lets you optionally connect your bank accounts using Plaid and Teller.
          </p>
          <p>
            <strong>How it will work:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Connect your bank accounts securely through Plaid/Teller
            </li>
            <li>
              We read your account balance totals (we never see transactions or details)
            </li>
            <li>
              Your net worth gets a "Verified" badge if the values match
            </li>
            <li>
              <strong>It's optional</strong> - you can stay unverified if you prefer privacy
            </li>
            <li>
              You can disconnect your banks anytime
            </li>
          </ul>
          <p>
            <strong>Privacy:</strong> Plaid and Teller use bank-level encryption. We only see balance totals, never transaction details.
          </p>
        </div>
      ),
    },
    {
      question: "What's coming next?",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>Our Roadmap:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>✅ Public Leaderboard</strong> - Live! View global rankings by net worth
            </li>
            <li>
              <strong>🚧 Verification System</strong> - Coming soon. Connect bank accounts via Plaid/Teller
            </li>
            <li>
              <strong>📅 Email Notifications</strong> - Get notified when you change rank
            </li>
            <li>
              <strong>📅 Enhanced Profiles</strong> - Add bio, links, social media handles to your profile
            </li>
            <li>
              <strong>📅 Gated Clubs</strong> - Join exclusive communities: $1M+, $10M+, $100M+
            </li>
            <li>
              <strong>📅 Net Worth Tracking</strong> - Visualize your wealth growth over time with graphs
            </li>
            <li>
              <strong>📅 Mobile App</strong> - Native iOS and Android apps
            </li>
            <li>
              <strong>📅 Social Features</strong> - Follow users, comments, messaging (eventually)
            </li>
          </ul>
          <p>
            Want to suggest a feature? Contact us at{" "}
            <a
              href="mailto:hello@stacked.gg"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              hello@stacked.gg
            </a>
            .
          </p>
        </div>
      ),
    },
  ];

  return (
    <StaticPageLayout title="Frequently Asked Questions">
      <p className="text-text-secondary text-lg mb-8">
        Everything you need to know about STACKED
      </p>
      <Accordion items={faqs} />
    </StaticPageLayout>
  );
}
