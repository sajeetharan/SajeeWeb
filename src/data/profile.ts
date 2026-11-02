import publicProfile from "../../static/profile.json";

export const profile = publicProfile;

export const personSchema = {
  "@type": "Person",
  "@id": profile.id,
  name: profile.name,
  url: profile.url,
  jobTitle: profile.jobTitle,
  description: profile.summary,
  worksFor: {
    "@type": "Organization",
    name: profile.employer.name,
  },
  knowsAbout: profile.expertise,
  sameAs: Object.values(profile.profiles),
  mainEntityOfPage: { "@id": `${profile.profilePage}#profile` },
};

export const careerSchema = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    {
      "@type": "ProfilePage",
      "@id": `${profile.profilePage}#profile`,
      url: profile.profilePage,
      name: `${profile.name} - Career and professional profile`,
      description: profile.summary,
      dateModified: profile.lastUpdated,
      mainEntity: { "@id": profile.id },
    },
  ],
};
