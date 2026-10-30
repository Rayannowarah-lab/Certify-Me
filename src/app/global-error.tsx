"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error caught by global boundary:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="font-sans antialiased flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#F7F6F2] text-[#151413]">
        <h2 className="text-3xl font-light mb-3">Application Error</h2>
        <p className="text-sm text-[#6B6763] max-w-md mb-8">
          A critical runtime error occurred while loading the application.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-3 rounded-full bg-[#151413] text-[#F7F6F2] text-xs font-medium"
        >
          Reload Archive
        </button>
      </body>
    </html>
  );
}
