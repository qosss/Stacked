import { StaticPageLayout } from "@/components/static/static-page-layout";
import { Accordion } from "@/components/static/accordion";

export const metadata = {
  title: "FAQ | STACKED",
  description: "Frequently asked questions about STACKED.",
};

const faqItems = [
  {
    question: "What is STACKED?",
    answer: (
      <p>
        STACKED is a global public leaderboard where people share their exact net worth and see how they rank. It's built for builders, founders, investors, and the financially curious. Think of it as a transparent scoreboard for wealth.
      </p>
    ),
  },
  {
    question: "How do I calculate my net worth?",
    answer: (
      <div className="space-y-3">
        <p>
          <strong>Net worth = Total Assets - Total Liabilities</strong>
        </p>
        <div>
          <p className="font-bold mb-2">Assets include:</p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-text-primary">
            <li>Cash and savings accounts</li>
            <li>Investment accounts (stocks, crypto, etc.)</li>
            <li>Real estate equity (home value minus mortgage)</li>
            <li>Business ownership or equity</li>
            <li>Vehicles</li>
            <li>Other valuable assets</li>
          </ul>
        </div>
        <div>
          <p className="font-bold mb-2">Liabilities include:</p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-text-primary">
            <li>Mortgages</li>
            <li>Student loans</li>
            <li>Credit card debt</li>
            <li>Auto loans</li>
            <li>Personal loans</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    question: "Are the numbers verified?",
    answer: (
      <p>
        Currently, no. All values are self-reported and unverified. We're building a verification system using Plaid or Teller for those who want a 'Verified' badge, but it will remain optional. Verified users will get special badging and a badge on their profile.
      </p>
    ),
  },
  {
    question: "Can I change my username?",
    answer: (
      <p>
        No. Usernames are permanent and cannot be changed by users. This creates scarcity and prevents username abuse. Choose carefully during signup! If you absolutely need a change, contact support@stacked.com (manual review required).
      </p>
    ),
  },
  {
    question: "Is my phone number public?",
    answer: (
      <p>
        Absolutely not. Your phone number is only used for authentication and is NEVER displayed publicly. Only your username, net worth, rank, and timestamps are visible to others. Privacy is a core principle of STACKED.
      </p>
    ),
  },
  {
    question: "How do I update my net worth?",
    answer: (
      <p>
        Log in and click 'Update Net Worth' in the header or visit your account dashboard at /me. Every update creates a new entry in your history with a timestamp. You can update as often as you like.
      </p>
    ),
  },
  {
    question: "What does 'OG' mean?",
    answer: (
      <p>
        'OG' badges are given to the first 1,000 users who join STACKED. 'Early' badges go to users 1,001-5,000. After that, no special badges are awarded. These are permanent status symbols that can never be earned again.
      </p>
    ),
  },
  {
    question: "Can I delete my account?",
    answer: (
      <p>
        Yes. Email support@stacked.com to request account deletion. We'll permanently remove all your data within 30 days in compliance with GDPR and CCPA. Send 'DELETE MY ACCOUNT' as the subject line.
      </p>
    ),
  },
  {
    question: "How is rank calculated?",
    answer: (
      <p>
        Ranks are calculated in real-time based on net worth from highest to lowest. Ties are broken by who updated most recently. Negative net worth is included—rank #1 is the highest net worth, and the last rank is the most negative. Updates immediately.
      </p>
    ),
  },
  {
    question: "What's coming next?",
    answer: (
      <div className="space-y-3">
        <p>Upcoming features include:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Verification badges via Plaid or Teller</li>
          <li>Enhanced profiles with custom avatars</li>
          <li>Gated clubs for millionaire+/billionaire+ tiers</li>
          <li>Email notifications for rank changes</li>
          <li>Net worth history charts and visualizations</li>
          <li>Public API access for builders</li>
          <li>Mobile app</li>
          <li>International expansion</li>
        </ul>
      </div>
    ),
  },
];

export default function FAQPage() {
  return (
    <StaticPageLayout 
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about STACKED"
    >
      <Accordion items={faqItems} />
    </StaticPageLayout>
  );
}