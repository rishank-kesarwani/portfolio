"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdBannerProps = {
  slot?: string;
  className?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal";
  responsive?: boolean;
  /**
   * Only render ad units on substantial editorial content pages.
   * AdSense policies restrict ads on navigation-only, empty, or thin pages.
   */
  isEditorialPage?: boolean;
};

export function AdBanner({
  slot,
  className = "",
  format = "auto",
  responsive = true,
  isEditorialPage = false,
}: AdBannerProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isPushed = useRef(false);

  // Validate publisher client ID format (must match ca-pub-XXXXXXXXXXXXXXXX)
  const isValidClient = Boolean(clientId && /^ca-pub-\d{10,20}$/.test(clientId));

  useEffect(() => {
    // Only initialize ads on verified editorial pages with valid client ID
    if (!isValidClient || !isEditorialPage || isPushed.current) return;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      }
    } catch {
      // Gracefully ignore adblocker or initialization errors
    }
  }, [isValidClient, isEditorialPage]);

  // Do not render ads if publisher ID is missing/invalid or on non-editorial pages
  if (!isValidClient || !isEditorialPage) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`mx-auto my-10 flex w-full max-w-4xl justify-center overflow-hidden px-4 ${className}`}
    >
      <div className="w-full text-center">
        <ins
          className="adsbygoogle block min-h-[90px] w-full"
          style={{ display: "block" }}
          data-ad-client={clientId}
          {...(slot ? { "data-ad-slot": slot } : {})}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </aside>
  );
}
