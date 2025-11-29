"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { PlaidLinkButton } from "@/components/plaid/plaid-link-button";
import { PageTransition } from "@/components/ui/page-transition";
import { Shield, CheckCircle, Building2 } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const { user, verifyNetWorth, isLoading } = useAuth();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [verifiedAmount, setVerifiedAmount] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
      return;
    }

    // Fetch link token on mount
    const fetchLinkToken = async () => {
      try {
        const response = await fetch("/api/plaid/create-link-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user?.id }),
        });
        const data = await response.json();
        if (data.link_token) {
          setLinkToken(data.link_token);
        }
      } catch (err) {
        console.error("Failed to fetch link token:", err);
      }
    };

    if (user) {
      fetchLinkToken();
    }
  }, [user, isLoading, router]);

  const handlePlaidSuccess = async (publicToken: string) => {
    setIsVerifying(true);
    setError("");

    try {
      const response = await fetch("/api/plaid/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token: publicToken }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setIsVerifying(false);
        return;
      }

      // Update user's net worth with verified amount
      const success = await verifyNetWorth(data.netWorth);

      if (success) {
        setVerifiedAmount(data.netWorth);
        setIsSuccess(true);
      } else {
        setError("Failed to save verified net worth");
      }
    } catch (err) {
      setError("Failed to verify accounts");
    }

    setIsVerifying(false);
  };

  const handleSkip = () => {
    router.push("/me");
  };

  const handleContinue = () => {
    router.push("/me");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background-deep">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-text-muted">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <Header />

      <PageTransition>
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-md w-full text-center">
            <Logo size="md" className="mx-auto mb-8" />

            {isSuccess ? (
              <>
                <div className="mb-8">
                  <CheckCircle className="h-16 w-16 text-positive mx-auto mb-4" />
                  <h1 className="text-3xl font-bold font-display mb-2">
                    Verified!
                  </h1>
                  <p className="text-text-muted">
                    Your net worth has been verified as
                  </p>
                  <p className="text-4xl font-bold font-display text-accent mt-2">
                    ${verifiedAmount?.toLocaleString()}
                  </p>
                </div>

                <Button
                  variant="primary"
                  onClick={handleContinue}
                  className="w-full"
                >
                  Continue to Dashboard
                </Button>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <Shield className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h1 className="text-3xl font-bold font-display mb-2">
                    Verify Your Net Worth
                  </h1>
                  <p className="text-text-muted">
                    Connect your bank accounts to verify your net worth and earn a verified badge.
                  </p>
                </div>

                <div className="bg-background-lighter border border-border rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-4 text-left">
                    <Building2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1">Bank-Level Security</h3>
                      <p className="text-text-muted text-sm">
                        We use Plaid, trusted by millions, to securely connect your accounts. We never see your login credentials.
                      </p>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded mb-6">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  {linkToken ? (
                    <PlaidLinkButton
                      linkToken={linkToken}
                      onSuccess={handlePlaidSuccess}
                      loading={isVerifying}
                      className="w-full"
                    />
                  ) : (
                    <Button variant="primary" disabled className="w-full">
                      Loading...
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    disabled={isVerifying}
                    className="w-full"
                  >
                    Skip for now
                  </Button>
                </div>

                <p className="text-text-muted text-xs mt-6">
                  You can verify your net worth later from your dashboard.
                </p>
              </>
            )}
          </div>
        </main>
      </PageTransition>

      <Footer />
    </div>
  );
}
