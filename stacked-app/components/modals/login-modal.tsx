"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Logo } from "@/components/ui/logo";
import { PhoneInput } from "@/components/auth/phone-input";
import { OTPInput } from "@/components/auth/otp-input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToJoin?: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onSwitchToJoin,
}: LoginModalProps) {
  const { login } = useAuth();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep("phone");
      setPhone("");
      setOtp("");
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

    if (!otp || otp.length === 0) {
      setError("Please enter a code");
      return;
    }

    // For testing: accept any verification code
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);

    // Close modal on successful login
    onClose();
  };

  const handleBackToPhone = () => {
    setStep("phone");
    setOtp("");
    setError("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Logo size="sm" />
      </div>

      <div className="text-center mb-6">
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
          loading={isLoading}
          className="w-full"
        >
          {step === "phone" ? "Continue" : "Verify Code"}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-text-muted text-sm">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToJoin}
            className="text-accent hover:opacity-80 transition-opacity cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </div>
    </Modal>
  );
}
