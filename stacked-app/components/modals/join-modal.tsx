"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { PhoneInput } from "@/components/auth/phone-input";
import { OTPInput } from "@/components/auth/otp-input";
import { UsernameInput } from "@/components/auth/username-input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

type SignupStep = "phone" | "otp" | "username";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

export function JoinModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: JoinModalProps) {
  const { signup } = useAuth();

  const [step, setStep] = useState<SignupStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep("phone");
      setPhone("");
      setOtp("");
      setUsername("");
      setError("");
      setIsLoading(false);
    }
  }, [isOpen]);

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

    if (!otp || otp.length === 0) {
      setError("Please enter a code");
      return;
    }

    // For testing: accept any verification code, move to username step
    setStep("username");
  };

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    // Create account with netWorth = 0 (user will set it later in /me)
    setIsLoading(true);
    const success = await signup(phone, username, 0);
    setIsLoading(false);

    if (success) {
      // Close modal on successful signup
      onClose();
    } else {
      setError("Failed to create account. Username or phone may be taken.");
    }
  };

  const handleBack = () => {
    if (step === "otp") {
      setStep("phone");
    } else if (step === "username") {
      setStep("otp");
    }
    setError("");
  };

  const getStepNumber = (): string => {
    switch (step) {
      case "phone":
        return "1";
      case "otp":
        return "2";
      case "username":
        return "3";
    }
  };

  const getStepTitle = (): string => {
    switch (step) {
      case "phone":
        return "Enter your phone";
      case "otp":
        return "Verify your phone";
      case "username":
        return "Choose a username";
    }
  };

  const getSubmitButtonText = (): string => {
    switch (step) {
      case "phone":
        return "Continue";
      case "otp":
        return "Verify Code";
      case "username":
        return "Create Account";
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
    }
  };

  // Step number badge
  const StepBadge = () => (
    <div className="inline-block bg-accent text-text-inverse font-bold rounded-full w-10 h-10 flex items-center justify-center mb-4">
      {getStepNumber()}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-8">
        <StepBadge />
        <h1 className="font-display text-3xl font-bold mb-2">Join STACKED</h1>
        <p className="text-text-muted text-sm">{getStepTitle()}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === "phone" && (
          <PhoneInput value={phone} onChange={setPhone} disabled={isLoading} />
        )}

        {step === "otp" && (
          <>
            <OTPInput value={otp} onChange={setOtp} disabled={isLoading} />
            <button
              type="button"
              onClick={() => {
                setStep("phone");
                setError("");
              }}
              className="w-full text-sm text-accent hover:opacity-80 transition-opacity"
            >
              ← Change phone number
            </button>
          </>
        )}

        {step === "username" && (
          <UsernameInput
            value={username}
            onChange={setUsername}
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
          loading={isLoading}
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
          <button
            onClick={onSwitchToLogin}
            className="text-accent hover:opacity-80 transition-opacity cursor-pointer"
          >
            Log in
          </button>
        </p>
      </div>
    </Modal>
  );
}
