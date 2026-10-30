"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center mb-6">
        <AlertCircle className="h-5 w-5 text-foreground" />
      </div>
      <h2 className="text-3xl font-headline font-light mb-3 text-foreground">
        Something went wrong
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground max-w-md mb-8">
        An unexpected error occurred while rendering this archive view. Please retry or return to the overview.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-medium"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full border border-foreground/20 hover:border-foreground text-xs font-medium text-foreground"
        >
          Back to Overview
        </Link>
      </div>
    </div>
  );
}
