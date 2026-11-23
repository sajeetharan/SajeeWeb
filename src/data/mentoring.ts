export const priorityDmService = {
  id: "2333453/pay",
  name: "Ask me anything",
  format: "Priority DM",
  duration: "Reply within 2 days",
  description:
    "Have a focused question? Send a message on Topmate without scheduling a call.",
  audience: "For a specific career, product, or technical question.",
  takeaway: "Get a focused reply without arranging a meeting.",
  analyticsAction: "question",
  cta: "Send my question",
};

export const discoveryCall = {
  id: "2235628",
  name: "Discovery Call",
  format: "Video meeting",
  duration: "15 minutes",
  description:
    "Discuss your goals and identify the right next step in a free introductory conversation.",
  audience: "For anyone unsure which session fits their goals.",
  takeaway: "Clarify your main challenge and decide where to start.",
  analyticsAction: "discovery",
  cta: "Book a free 15-minute discovery call",
};

export const mentoringTestimonials = [
  {
    topic: "Moving into Product Management",
    quote:
      "He shared valuable insights about transitioning into Product Management",
  },
  {
    topic: "Practical next steps",
    quote: "I left the session motivated, with concrete steps to take forward",
  },
];

const topmateReviewSource = {
  source: "Topmate",
  sourceUrl: "https://topmate.io/sajeetharan",
};
const adplistReviewSource = {
  source: "ADPList",
  sourceUrl: "https://adplist.org/mentors/sajeetharan-sinnathurai",
};

export const officeTestimonials = [
  {
    ...mentoringTestimonials[0],
    ...topmateReviewSource,
    id: "topmate-pm",
    author: "Shruti Solanki",
  },
  {
    ...mentoringTestimonials[1],
    ...topmateReviewSource,
    id: "topmate-next-steps",
    author: "",
  },
  {
    ...topmateReviewSource,
    id: "topmate-job-search",
    quote: "Very insightful and helpful in job search and CV analysis.",
    author: "Harsh Kalokhe",
  },
  {
    ...topmateReviewSource,
    id: "topmate-connection",
    quote: "Was an insightful connection. Very helpful",
    author: "",
  },
  {
    ...topmateReviewSource,
    id: "topmate-career-clarity",
    quote: "He will clear all my doubts regarding the positions and jobs",
    author: "Pidikiti Madhu Chandana",
  },
  {
    ...topmateReviewSource,
    id: "topmate-feedback",
    quote: "Got lot of insights and feebacks",
    author: "Gowseik V",
  },
  {
    ...topmateReviewSource,
    id: "topmate-discussion",
    quote: "Super insightful session and a great person to discuss with",
    author: "Satish Kumar G",
  },
  {
    ...topmateReviewSource,
    id: "topmate-guidance",
    quote: "Got more insights and guidance.",
    author: "",
  },
  {
    ...adplistReviewSource,
    id: "adplist-ai",
    quote: "his ability to turn complex concepts into clear, practical advice",
    author: "Hirish",
  },
  {
    ...adplistReviewSource,
    id: "adplist-goals",
    quote:
      "amazing communication and subject knowledge truly helped clarify my goals",
    author: "Tharu Tharujan",
  },
  {
    ...adplistReviewSource,
    id: "adplist-problem-solving",
    quote:
      "They provided practical insights that helped me navigate my challenges effectively.",
    author: "Soumya Soni",
  },
  {
    ...adplistReviewSource,
    id: "adplist-pm",
    quote:
      "He shared practical guidance, a useful template, and resources to explore further.",
    author: "Neha Tiwary",
  },
  {
    ...adplistReviewSource,
    id: "adplist-encouragement",
    quote:
      "His motivational approach provided me with invaluable insights and encouragement.",
    author: "Satish Kumar G",
  },
  {
    ...adplistReviewSource,
    id: "adplist-profile",
    quote: "The session was very insightful and gave me a clear understanding",
    author: "Bhaskar Madiredla",
  },
];

export const mentoringServices = [
  discoveryCall,
  {
    id: "2235625",
    name: "1:1 Mentorship",
    format: "Video meeting",
    duration: "30 minutes",
    description:
      "Work through one career decision or technical-growth challenge with practical, personalized guidance.",
    audience: "For professionals looking for clarity on a specific next move.",
    takeaway: "Agree on concrete actions to take after the session.",
    analyticsAction: "mentorship",
    cta: "Book mentorship",
  },
  {
    id: "2333442",
    name: "PM Interview Prep — Tips & Mock Questions",
    format: "Video meeting",
    duration: "30 minutes",
    description:
      "Practice product management interview questions and receive targeted feedback on your answers.",
    audience: "For candidates with an upcoming PM interview.",
    takeaway: "Identify where your answers can be clearer and more structured.",
    analyticsAction: "interview",
    cta: "Prepare for my interview",
  },
  {
    id: "2255580",
    name: "Pathway to Product Management",
    format: "Video meeting",
    duration: "30 minutes",
    description:
      "Explore how your engineering experience transfers into product management and plan practical next steps.",
    audience: "For engineers considering a move into Product Management.",
    takeaway: "Identify transferable skills and gaps to focus on next.",
    analyticsAction: "pathway",
    cta: "Explore my PM pathway",
  },
  priorityDmService,
];

export function topmateServiceUrl(id: string): string {
  return `https://topmate.io/sajeetharan/${id}`;
}
