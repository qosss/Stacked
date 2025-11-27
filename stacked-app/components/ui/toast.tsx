"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-sm border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full bg-background-card border-border-light",
  {
    variants: {
      variant: {
        success:
          "border-green-500/30 bg-green-500/10 [&_svg]:text-green-500 text-text-primary",
        error:
          "border-red-500/30 bg-red-500/10 [&_svg]:text-red-500 text-text-primary",
        info: "border-accent/30 bg-accent/10 [&_svg]:text-accent text-text-primary",
        warning:
          "border-yellow-500/30 bg-yellow-500/10 [&_svg]:text-yellow-500 text-text-primary",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
));
Toast.displayName = ToastPrimitives.Root.displayName;

interface ToastActionElement {
  altText: string;
  action: React.ReactNode;
}

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className="inline-flex h-8 shrink-0 items-center justify-center rounded-sm border border-border-light px-3 text-xs font-medium transition-colors hover:bg-background-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-deep disabled:pointer-events-none disabled:opacity-50"
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className="absolute right-2 top-2 rounded-sm p-1 text-text-muted/50 opacity-0 transition-opacity hover:text-text-muted focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent group-hover:opacity-100"
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className="font-semibold" {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className="text-sm text-text-muted"
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastActionOrReactNode =
  | ToastActionElement
  | React.ReactNode;

interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionOrReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "success" | "error" | "info" | "warning";
  duration?: number;
}

export {
  type ToastProps,
  type ToastActionOrReactNode,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastAction,
  ToastClose,
  ToastTitle,
  ToastDescription,
};

export const getIconForVariant = (variant?: "success" | "error" | "info" | "warning") => {
  switch (variant) {
    case "success":
      return <CheckCircle className="h-5 w-5" />;
    case "error":
      return <AlertCircle className="h-5 w-5" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5" />;
    case "info":
    default:
      return <Info className="h-5 w-5" />;
  }
};
