type PortfolioEvent =
  | { name: "career_view" }
  | { name: "mentoring_view" }
  | {
      name: "mentoring_click";
      source: "homepage" | "awards" | "article" | "mentoring";
      action:
        | "explore"
        | "discovery"
        | "mentorship"
        | "interview"
        | "pathway"
        | "question";
    }
  | {
      name: "project_click";
      project_id: string;
      action: "source" | "demo" | "guide";
    }
  | {
      name: "contact_click";
      audience: "recruiter" | "collaborator" | "speaking";
    };

type AnalyticsWindow = Window & {
  gtag?: (
    command: "event",
    name: PortfolioEvent["name"],
    parameters: Record<string, string>,
  ) => void;
};

export function trackPortfolioEvent(event: PortfolioEvent): void {
  if (typeof window === "undefined") return;
  const { gtag } = window as AnalyticsWindow;
  // Analytics can be absent in development or blocked by the visitor.
  if (typeof gtag !== "function") return;
  const { name, ...parameters } = event;
  gtag("event", name, { ...parameters, transport_type: "beacon" });
}

export function trackPortfolioClick(data: DOMStringMap): void {
  const {
    portfolioProject: project,
    portfolioAction: action,
    portfolioContact: audience,
    mentoringSource,
    mentoringAction,
  } = data;
  if (
    project &&
    (action === "source" || action === "demo" || action === "guide")
  ) {
    trackPortfolioEvent({ name: "project_click", project_id: project, action });
  } else if (
    audience === "recruiter" ||
    audience === "collaborator" ||
    audience === "speaking"
  ) {
    trackPortfolioEvent({ name: "contact_click", audience });
  } else if (
    (mentoringSource === "homepage" ||
      mentoringSource === "awards" ||
      mentoringSource === "article" ||
      mentoringSource === "mentoring") &&
    (mentoringAction === "explore" ||
      mentoringAction === "discovery" ||
      mentoringAction === "mentorship" ||
      mentoringAction === "interview" ||
      mentoringAction === "pathway" ||
      mentoringAction === "question")
  ) {
    trackPortfolioEvent({
      name: "mentoring_click",
      source: mentoringSource,
      action: mentoringAction,
    });
  }
}
