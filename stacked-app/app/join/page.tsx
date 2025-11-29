"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/auth/phone-input";
import { OTPInput } from "@/components/auth/otp-input";
import { UsernameInput } from "@/components/auth/username-input";
import { DisplayNameInput } from "@/components/auth/displayname-input";
import { NetWorthInput } from "@/components/auth/networth-input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { validateDisplayName } from "@/lib/validation";
import Link from "next/link";

type SignupStep = "phone" | "otp" | "username" | "displayname" | "networth";

export default function JoinPage() {
  const router = useRouter();
  const { signup, user } = useAuth();

  const [step, setStep] = useState<SignupStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [netWorth, setNetWorth] = useState("");
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
    // Simulate API check to see if phone is already registered
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);

    // For mock, we'll just move to OTP step
    setStep("otp");
    setOtp("");
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    // Move to username step
    setStep("username");
  };

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    // Move to display name step
    setStep("displayname");
  };

  const handleDisplayNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateDisplayName(displayName);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Move to net worth step
    setStep("networth");
  };

  const handleNetWorthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const numericValue = parseInt(netWorth.replace(/,/g, ""));
    if (!netWorth || isNaN(numericValue) || numericValue <= 0) {
      setError("Please enter a valid net worth amount");
      return;
    }

    setIsLoading(true);
    const success = await signup(phone, username, displayName, numericValue);
    setIsLoading(false);

    if (success) {
      // Redirect to verification page
      router.push("/verify");
    } else {
      setError("Failed to create account. Username or phone may be taken.");
    }
  };

  const handleBack = () => {
    if (step === "otp") {
      setStep("phone");
    } else if (step === "username") {
      setStep("otp");
    } else if (step === "displayname") {
      setStep("username");
    } else if (step === "networth") {
      setStep("displayname");
    }
    setError("");
  };

  const getStepNumber = () => {
    switch (step) {
      case "phone":
        return "1";
      case "otp":
        return "2";
      case "username":
        return "3";
      case "displayname":
        return "4";
      case "networth":
        return "5";
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "phone":
        return "Enter your phone";
      case "otp":
        return "Verify your phone";
      case "username":
        return "Choose a username";
      case "displayname":
        return "What's your name?";
      case "networth":
        return "Enter your net worth";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    switch (step) {
      case "phone":
        handlePhoneSubmit(e);
        break;
      case "otp":
        handleOTPSubmit(e);
        break;
      case "username":
        handleUsernameSubmit(e);
        break;
      case "displayname":
        handleDisplayNameSubmit(e);
        break;
      case "networth":
        handleNetWorthSubmit(e);
        break;
    }
  };

  const getSubmitButtonText = () => {
    if (isLoading) return "...";
    switch (step) {
      case "phone":
        return "Continue";
      case "otp":
        return "Verify Code";
      case "username":
        return "Next";
      case "displayname":
        return "Next";
      case "networth":
        return "Create Account";
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background-deep">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Join STACKED</h1>
          <p className="text-text-muted text-sm">{getStepTitle()}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === "phone" && (
            <PhoneInput value={phone} onChange={setPhone} disabled={isLoading} />
          )}

          {step === "otp" && (
            <OTPInput value={otp} onChange={setOtp} disabled={isLoading} />
          )}

          {step === "username" && (
            <UsernameInput
              value={username}
              onChange={setUsername}
              disabled={isLoading}
            />
          )}

          {step === "displayname" && (
            <DisplayNameInput
              value={displayName}
              onChange={setDisplayName}
              disabled={isLoading}
            />
          )}

          {step === "networth" && (
            <NetWorthInput
              value={netWorth}
              onChange={setNetWorth}
              disabled={isLoading}
            />
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
            {getSubmitButtonText()}
          </Button>

          {step !== "phone" && (
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={isLoading}
              className="w-full"
            >
              ← Back
            </Button>
          )}
        </form>

        <div className="text-center mt-6">
          <p className="text-text-muted text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:opacity-80">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
