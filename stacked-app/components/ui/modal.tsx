"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center transition-all duration-300",
        isOpen
          ? "opacity-100 visible bg-black/85 backdrop-blur-sm"
          : "opacity-0 invisible"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative transition-all duration-300",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-5 scale-95 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background-elevated border border-border-light text-text-muted hover:bg-background-hover hover:text-text-primary hover:rotate-90 transition-all duration-200 flex items-center justify-center text-lg font-bold"
          aria-label="Close modal"
        >
          ×
        </button>
        <div
          className={cn(
            "bg-background-card border border-border-light rounded-md p-8 w-full max-w-sm shadow-2xl",
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
