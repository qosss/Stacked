import { StaticPageLayout } from "@/components/layout/static-page-layout";

export default function TermsPage() {
  return (
    <StaticPageLayout title="Terms of Service" lastUpdated="November 26, 2024">
      <div className="space-y-12">
        {/* Acceptance of Terms */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            1. Acceptance of Terms
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            By accessing and using STACKED, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            <strong>Age Requirement:</strong> You must be at least 13 years old to use STACKED. If you are under 18, your parent or legal guardian must consent to these terms on your behalf.
          </p>
          <p className="text-sm leading-relaxed text-text-primary">
            We may update these terms at any time. Continued use of the platform after changes constitutes your acceptance of the new terms.
          </p>
        </section>

        {/* Account Registration */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            2. Account Registration
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            To use STACKED, you must create an account using a valid phone number. You agree to:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>Provide accurate, complete, and current information during registration</li>
            <li>
              Maintain the confidentiality of your account credentials and be responsible for all activity under your account
            </li>
            <li>
              Not share your account with others or use another person's account without permission
            </li>
            <li>
              Notify us immediately of any unauthorized use of your account or any other breach of security
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-text-primary">
            One phone number per account is permitted. Using multiple accounts to artificially boost rankings or manipulate the leaderboard is prohibited and may result in suspension.
          </p>
        </section>

        {/* Username Policy */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            3. Username Policy
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            Your username is a core part of your STACKED identity. Please choose wisely:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>
              <strong>Permanence:</strong> Usernames cannot be changed once created. This ensures scarcity and personal identity.
            </li>
            <li>
              <strong>Format Requirements:</strong> Usernames must be lowercase, 3-20 characters, containing only letters, numbers, and underscores (a-z, 0-9, _).
            </li>
            <li>
              <strong>Prohibited Usernames:</strong> You may not use usernames that:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Contain obscenities or hate speech</li>
                <li>Impersonate real people or organizations</li>
                <li>Infringe on trademarks or intellectual property</li>
                <li>Are reserved by STACKED (e.g., "admin", "support", "stacked")</li>
              </ul>
            </li>
            <li>
              <strong>STACKED Rights:</strong> We reserve the right to reclaim or suspend usernames for abuse, impersonation, or violation of these terms.
            </li>
          </ul>
        </section>

        {/* Self-Reported Data Disclaimer */}
        <section>
          <div className="border-l-4 border-accent bg-accent/10 p-6 rounded-r mb-6">
            <h2 className="font-display text-2xl font-bold mb-4 text-accent">
              4. ⚠️ Self-Reported Data Disclaimer
            </h2>
            <p className="text-sm leading-relaxed mb-4 text-text-primary">
              <strong>IMPORTANT:</strong> All net worth values on STACKED are self-reported by users. This is critical information you must understand:
            </p>
            <ul className="list-disc list-inside space-y-3 text-sm text-text-primary">
              <li>
                <strong>No Verification:</strong> In the current MVP phase, STACKED does not verify or validate the accuracy of reported net worth values.
              </li>
              <li>
                <strong>Not Financial Advice:</strong> STACKED is not financial advice. Rankings and comparisons should not be used to make financial decisions.
              </li>
              <li>
                <strong>Use at Your Own Risk:</strong> Any decisions or actions based on information from STACKED are at your own discretion and risk.
              </li>
              <li>
                <strong>No Responsibility:</strong> STACKED is not responsible for the accuracy, completeness, or consequences of any self-reported data.
              </li>
              <li>
                <strong>Future Verification:</strong> We are building a verification system using Plaid/Teller to allow optional bank account connection. This will be optional, and unverified values will be clearly marked.
              </li>
            </ul>
            <p className="text-sm leading-relaxed mt-4 text-text-primary">
              By using STACKED and viewing rankings, you acknowledge and accept that all data is self-reported and unverified.
            </p>
          </div>
        </section>

        {/* Prohibited Conduct */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            5. Prohibited Conduct
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            You agree not to engage in any of the following prohibited activities:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>
              <strong>Spam & Abuse:</strong> Harassment, bullying, or sending unsolicited messages
            </li>
            <li>
              <strong>Impersonation:</strong> Pretending to be someone else or creating accounts in others' names
            </li>
            <li>
              <strong>Automated Access:</strong> Using bots, scrapers, or automated tools to access the platform without permission
            </li>
            <li>
              <strong>False Information:</strong> Intentionally providing misleading or fraudulent information
            </li>
            <li>
              <strong>Illegal Activity:</strong> Any activity that violates local, state, national, or international law
            </li>
            <li>
              <strong>Circumventing Security:</strong> Attempting to bypass security measures or access unauthorized areas
            </li>
            <li>
              <strong>Manipulation:</strong> Creating multiple accounts, artificially inflating rankings, or gaming the leaderboard
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-text-primary">
            We monitor for prohibited conduct and take violations seriously.
          </p>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            6. Intellectual Property
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            <strong>STACKED Content:</strong> All design, code, features, and original content on STACKED are owned by or licensed to STACKED and are protected by international copyright and trademark laws.
          </p>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            <strong>Your Content:</strong> You retain ownership of any data you submit (your username, net worth values). By submitting this data, you grant STACKED a license to display, distribute, and use this data on the platform.
          </p>
          <p className="text-sm leading-relaxed text-text-primary">
            <strong>Restrictions:</strong> You may not copy, modify, distribute, or reproduce any content from STACKED without explicit permission.
          </p>
        </section>

        {/* Termination */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            7. Termination
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            STACKED reserves the right to suspend or terminate your account if you:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>Violate these terms or any applicable laws</li>
            <li>Engage in prohibited conduct (see Section 5)</li>
            <li>Provide false or misleading information</li>
            <li>Engage in harassment or abusive behavior</li>
          </ul>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            <strong>Warning System:</strong> Most violations will result in a warning before suspension. Severe violations (fraud, abuse, illegal activity) may result in immediate termination without warning.
          </p>
          <p className="text-sm leading-relaxed text-text-primary">
            <strong>User-Initiated Deletion:</strong> You will be able to delete your account (coming soon). You can contact{" "}
            <a
              href="mailto:hello@stacked.gg"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              hello@stacked.gg
            </a>{" "}
            for assistance with account deletion requests.
          </p>
        </section>

        {/* Disclaimers */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            8. Disclaimers
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            STACKED is provided "as is" and "as available" without any warranties, express or implied:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>
              <strong>No Guarantees:</strong> We make no guarantee of accuracy, reliability, uptime, or fitness for any particular purpose.
            </li>
            <li>
              <strong>Not Financial Advice:</strong> STACKED is not a financial advisor. Viewing net worth rankings is not financial advice and should not be used to make investment decisions.
            </li>
            <li>
              <strong>Not Legal Advice:</strong> These terms, our privacy policy, and any communication from STACKED do not constitute legal advice.
            </li>
            <li>
              <strong>Not Professional Advice:</strong> Any information or content on STACKED is for informational purposes only.
            </li>
            <li>
              <strong>User-Generated Content:</strong> STACKED is not responsible for the accuracy, completeness, or consequences of user-submitted data.
            </li>
            <li>
              <strong>Third-Party Services:</strong> We are not responsible for services, content, or data provided by third parties (Supabase, Plaid, Teller, etc.).
            </li>
          </ul>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            9. Limitation of Liability
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            To the fullest extent permitted by law, STACKED and its officers, directors, employees, and agents shall not be liable for:
          </p>
          <ul className="list-disc list-inside space-y-3 text-sm text-text-primary mb-6">
            <li>
              <strong>Maximum Liability:</strong> Our total liability shall not exceed $100 or the amount you paid us, whichever is greater.
            </li>
            <li>
              <strong>Indirect Damages:</strong> We are not liable for lost profits, data loss, or other indirect, incidental, or consequential damages.
            </li>
            <li>
              <strong>Your Indemnification:</strong> You agree to indemnify and hold harmless STACKED from any claims, damages, or costs arising from your violation of these terms or your use of STACKED.
            </li>
            <li>
              <strong>Force Majeure:</strong> We are not liable for failure to perform due to causes beyond our reasonable control (natural disasters, wars, pandemics, etc.).
            </li>
          </ul>
        </section>

        {/* Governing Law & Disputes */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            10. Governing Law & Disputes
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            These terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles.
          </p>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            <strong>Dispute Resolution:</strong> Any disputes shall be resolved through binding arbitration rather than court proceedings. Both parties agree to arbitrate any disputes.
          </p>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            <strong>Class Action Waiver:</strong> You agree not to participate in any class action lawsuit against STACKED. All disputes must be resolved on an individual basis.
          </p>
          <p className="text-sm leading-relaxed mb-6 text-text-primary">
            <strong>Severability:</strong> If any provision of these terms is found to be invalid, that provision shall be severed and the remaining terms shall continue in effect.
          </p>
          <p className="text-sm leading-relaxed text-text-primary">
            <strong>Entire Agreement:</strong> These terms, along with the Privacy Policy, constitute the entire agreement between you and STACKED regarding your use of the platform.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 text-text-primary">
            Questions?
          </h2>
          <p className="text-sm leading-relaxed text-text-primary">
            If you have any questions about these Terms of Service, please contact us at{" "}
            <a
              href="mailto:hello@stacked.gg"
              className="text-accent hover:opacity-80 transition-opacity underline"
            >
              hello@stacked.gg
            </a>
            .
          </p>
        </section>
      </div>
    </StaticPageLayout>
  );
}
