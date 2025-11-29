"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import FocusTrap from "focus-trap-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-sm md:max-w-md",
  lg: "max-w-sm md:max-w-2xl",
};

export function Modal({ isOpen, onClose, children, className, size = "sm" }: ModalProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
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

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) {
    return null;
  }

  return createPortal(
    <FocusTrap
      focusTrapOptions={{
        initialFocus: false,
        allowOutsideClick: false,
        escapeDeactivates: false,
      }}
    >
      <div
        className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 opacity-100 visible bg-black/85 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="transition-all duration-300 translate-y-0 scale-100 opacity-100"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Modal dialog"
        >
          <div
            className={cn(
              "relative bg-background-card border border-border-light rounded-md p-4 sm:p-6 md:p-8 w-[85vw] sm:w-full my-4 shadow-2xl text-text-primary",
              sizeClasses[size],
              className
            )}
          >
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background-elevated border border-border-light text-text-muted hover:bg-background-hover hover:text-text-primary hover:rotate-90 transition-all duration-200 flex items-center justify-center text-lg font-bold z-10"
              aria-label="Close modal"
            >
              ×
            </button>
            {children}
          </div>
        </div>
      </div>
    </FocusTrap>,
    document.body
  );
}
