import { themes } from "prism-react-renderer";

import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Sajeetharan Sinnathurai,From Code to Cloud ",
  tagline:
    "From Humble Beginnings to Global Impact—Empowering Developers, One Line at a Time",
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
          "Empowering developers with cloud & databases  | Principal PM | Top Stack Overflow contributor | GDE & MVP | Speaker & OSS contributor",
      },
      {
        name: "keywords",
        content:
          "fullstack,frontend,developer,databases,azure,cloud,azurecosmosdb,engineer,javascript,graphql,rest,react,angukar,devops,cloud-native,cka,ckad,open-source",
      },
      {
        name: "twitter:card",
        content: "summary",
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: false,
      title: "Sajeetharan Sinnathruai",
      logo: {
        alt: "Sajeetharan's Logo",
        src: "img/logo.svg",
        srcDark: "img/logo-white.svg",
      },
      items: [
        { to: "/projects", label: "Projects", position: "left" },
        { to: "/talks", label: "Talks", position: "left" },
        { to: "/awards", label: "Awards", position: "left" },
        { to: "/blogs", label: "Blogs", position: "left" },
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
