"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";

export function NProgressProvider() {
  const router = useRouter();

  useEffect(() => {
    // Configure NProgress
    NProgress.configure({ showSpinner: false, speed: 400, easing: "ease" });

    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    // Listen to Next.js router events
    window.addEventListener("popstate", handleStart);

    // For client-side navigation, we use a mutation observer to detect route changes
    const originalPush = window.history.pushState;
    const originalReplace = window.history.replaceState;

    window.history.pushState = function (...args) {
      handleStart();
      originalPush.apply(this, args);
      setTimeout(handleStop, 100);
      return;
    };

    window.history.replaceState = function (...args) {
      handleStart();
      originalReplace.apply(this, args);
      setTimeout(handleStop, 100);
      return;
    };

    return () => {
      window.removeEventListener("popstate", handleStart);
      window.history.pushState = originalPush;
      window.history.replaceState = originalReplace;
    };
  }, [router]);

  return null;
}
