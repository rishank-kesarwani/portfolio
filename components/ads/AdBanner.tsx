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
};

export function AdBanner({
  slot,
  className = "",
  format = "auto",
  responsive = true,
}: AdBannerProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isPushed = useRef(false);

  useEffect(() => {
    if (!clientId || isPushed.current) return;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      }
    } catch {
      // AdSense initialization error or adblocker encountered
    }
  }, [clientId]);

  if (!clientId) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`mx-auto my-8 flex w-full max-w-6xl justify-center overflow-hidden px-5 sm:px-6 lg:px-8 ${className}`}
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
