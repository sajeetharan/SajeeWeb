export const priorityDmService = {
  id: "2333453/pay",
  name: "Ask me anything",
  format: "Priority DM",
  duration: "Reply within 2 days",
  description:
    "Have a focused question? Send a message on Topmate without scheduling a call.",
  cta: "Send my question",
};

export const mentoringServices = [
  {
    id: "2235625",
    name: "1:1 Mentorship",
    format: "Video meeting",
    duration: "30 minutes",
    description:
      "Get personalized guidance on your career, technical growth, and next steps.",
    cta: "Book mentorship",
  },
  {
    id: "2333442",
    name: "PM Interview Prep — Tips & Mock Questions",
    format: "Video meeting",
    duration: "30 minutes",
    description:
      "Prepare for your product management interview with practical tips and mock questions.",
    cta: "Prepare for my interview",
  },
  {
    id: "2255580",
    name: "Pathway to Product Management",
    format: "Video meeting",
    duration: "30 minutes",
    description:
      "Explore your transition into product management and discuss a path that fits your experience.",
    cta: "Explore my PM pathway",
  },
  priorityDmService,
  {
    id: "2235628",
    name: "Discovery Call",
    format: "Video meeting",
    duration: "15 minutes",
    description:
      "Not sure where to start? Have a short introductory conversation about your goals.",
    cta: "Book a discovery call",
  },
];

export function topmateServiceUrl(id: string): string {
  return `https://topmate.io/sajeetharan/${id}`;
}
