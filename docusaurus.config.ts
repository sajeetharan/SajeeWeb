import { themes } from "prism-react-renderer";

import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title:
    "Sajeetharan Sinnathurai | Developer Tooling, Azure Cosmos DB & Coding Agents",
  tagline:
    "Principal PM at Microsoft empowering developers with Azure Cosmos DB, GitHub Copilot, coding agents, and NoSQL databases—from code to cloud.",
  url: "https://sajeetharan.github.io/",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config
  organizationName: "sajeetharan",
  projectName: "website",

  customFields: {
    newsletter: {
      action: "",
      method: "post",
      emailFieldName: "EMAIL",
      firstNameFieldName: "FNAME",
      submitButtonName: "subscribe",
      tosURL: "https://mailchimp.com/legal/terms/",
      privacyPolicyURL: "https://www.intuit.com/privacy/statement/",
      serviceName: "Mailchimp",
    },
  },

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "api-catalog",
        href: "/.well-known/api-catalog",
        type: "application/linkset+json",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "alternate",
        href: "/blogs/rss.xml",
        type: "application/rss+xml",
        title: "Blog RSS Feed",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "alternate",
        href: "/blogs/atom.xml",
        type: "application/atom+xml",
        title: "Blog Atom Feed",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "describedby",
        href: "/sitemap.xml",
        type: "application/xml",
      },
    },
  ],

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  plugins: [
    "docusaurus-plugin-sass",
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 85,
        max: 2000,
        min: 500,
        steps: 4,
        disableInDev: false,
      },
    ],
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        gtag: {
          trackingID: "G-Z468LV5WJ4",
          anonymizeIP: true,
        },

        docs: false,
        blog: {
          routeBasePath: "/blogs",
          showReadingTime: true,
          postsPerPage: 5,
          blogSidebarCount: 10,
          editUrl: "https://github.com/sajeetharan/website/tree/main/",
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} Sajeetharan`,
          },
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.scss")],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/logo-small.png",
    metadata: [
      {
        name: "description",
        content:
          "Sajeetharan Sinnathurai — Principal PM at Microsoft specializing in Developer Tooling, Azure Cosmos DB, Developer Experience, Coding Agents, GitHub Copilot, and NoSQL databases. Speaker, mentor, and open-source contributor.",
      },
      {
        name: "keywords",
        content:
          "Sajeetharan,Microsoft,Developer Tooling,Databases,Azure Cosmos DB,Cosmos DB,Developer Experience,Coding Agents,NoSQL,Copilot,GitHub,Azure,cloud,developer,fullstack,javascript,open-source,GDE,MVP,Stack Overflow,DevOps,cloud-native",
      },
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "author",
        content: "Sajeetharan Sinnathurai",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: "Sajeetharan Sinnathurai",
      },
    ],
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: false,
      title: "Sajeetharan Sinnathurai",
      logo: {
        alt: "Sajeetharan's Logo",
        src: "img/logo-sketch.png",
        srcDark: "img/logo-sketch.png",
        style: { borderRadius: "50%" },
      },
      items: [
        { to: "/blogs", label: "Blogs", position: "left" },
        { to: "/talks", label: "Talks", position: "left" },
        { to: "/projects", label: "Projects", position: "left" },
        { to: "/awards", label: "Awards", position: "left" },
        {
          href: "https://adplist.org/mentors/sajeetharan-sinnathurai?session=pathway-to-product-management-2a3a-mqkf9umx",
          label: "Get Mentored",
          position: "left",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Connect",
          items: [
            {
              label: "Email me",
              href: "mailto:sajeefx@gmail.com",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/sajeetharan",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/kokkisajee",
            },
          ],
        },
        {
          title: "Discover",
          items: [
            {
              label: "About me",
              to: "/",
            },
            {
              label: "Talks",
              to: "/talks",
            },
            {
              label: "Blogs",
              to: "/blogs",
            },
          ],
        },
      ],
      copyright: `Copyright © 2012-${new Date().getFullYear()} Sajeetharan Sinnathurai.`,
    },

    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

module.exports = config;
