"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/auth/phone-input";
import { OTPInput } from "@/components/auth/otp-input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    router.push("/");
    return null;
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phone) {
      setError("Phone number is required");
      return;
    }

    setIsLoading(true);
    const success = await login(phone);
    setIsLoading(false);

    if (success) {
      setStep("otp");
      setOtp("");
    } else {
      setError("Phone number not found. Try signing up instead.");
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    // In a real app, verify the OTP. For mock, we'll just redirect.
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);

    // Redirect to home
    router.push("/");
  };

  const handleBackToPhone = () => {
    setStep("phone");
    setOtp("");
    setError("");
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background-deep">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-text-muted text-sm">
            {step === "phone"
              ? "Enter your phone to log in"
              : "Enter the code we sent to your phone"}
          </p>
        </div>

        <form
          onSubmit={step === "phone" ? handlePhoneSubmit : handleOTPSubmit}
          className="space-y-6"
        >
          {step === "phone" ? (
            <PhoneInput
              value={phone}
              onChange={setPhone}
              disabled={isLoading}
            />
          ) : (
            <>
              <OTPInput value={otp} onChange={setOtp} disabled={isLoading} />
              <button
                type="button"
                onClick={handleBackToPhone}
                className="w-full text-sm text-accent hover:opacity-80 transition-opacity"
              >
                ← Change phone number
              </button>
            </>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-3 py-2 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "..." : step === "phone" ? "Continue" : "Verify Code"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-text-muted text-sm">
            Don't have an account?{" "}
            <Link href="/join" className="text-accent hover:opacity-80">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
