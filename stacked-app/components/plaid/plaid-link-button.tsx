"use client";

import { useCallback } from "react";
import { usePlaidLink, PlaidLinkOnSuccess, PlaidLinkOnExit } from "react-plaid-link";
import { Button } from "@/components/ui/button";

interface PlaidLinkButtonProps {
  linkToken: string;
  onSuccess: (publicToken: string) => void;
  onExit?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function PlaidLinkButton({
  linkToken,
  onSuccess,
  onExit,
  loading,
  disabled,
  className,
}: PlaidLinkButtonProps) {
  const handleSuccess = useCallback<PlaidLinkOnSuccess>(
    (publicToken, metadata) => {
      onSuccess(publicToken);
    },
    [onSuccess]
  );

  const handleExit = useCallback<PlaidLinkOnExit>(
    (error, metadata) => {
      if (onExit) {
        onExit();
      }
    },
    [onExit]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: handleSuccess,
    onExit: handleExit,
  });

  return (
    <Button
      variant="primary"
      onClick={() => open()}
      disabled={!ready || disabled || loading}
      loading={loading}
      className={className}
    >
      Connect Bank Account
    </Button>
  );
}
