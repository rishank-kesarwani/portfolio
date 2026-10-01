export type AnalyticsEvent =
  | "page_view"
  | "project_open"
  | "live_app_click"
  | "travel_plan_generated"
  | "movie_search"
  | "sports_search"
  | "study_spot_search"
  | "affiliate_click";

type GtagFn = (command: string, action: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export function trackEvent(eventName: AnalyticsEvent, params?: Record<string, string | number | boolean>) {
  try {
    if (typeof window !== "undefined") {
      // Custom event dispatch for analytics listeners
      window.dispatchEvent(
        new CustomEvent("portfolio_analytics", {
          detail: { eventName, params, timestamp: Date.now() },
        })
      );

      // Google Analytics gtag support if configured
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
      }
    }
  } catch {
    // Gracefully handle analytics failures
  }
}
