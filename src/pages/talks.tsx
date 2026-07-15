import React, { useState, useMemo } from "react";
import Layout from "@theme/Layout";

import Talk, { TalkMetadata } from "../components/talks/Talk";

import BuildingGQLAPIForK8sResDescription from "./assets/talks/_building-gql-api-for-k8s-res.md";
import DevTeamCollaborationGitBestPracticesDescription from "./assets/talks/_dev-team-collaboration-git-best-practices.md";
import GraphQLInGoDescription from "./assets/talks/_graphql-in-go.md";

const talks: TalkMetadata[] = [
  {
    title:
      "Turning Coding Agents into an Azure Cosmos DB Expert with the Agent Kit",
    description:
      "Learn how the Azure Cosmos DB Agent Kit transforms coding agents into database experts. In this session with Scott Hanselman on the Azure Developers show, we explore how AI-powered coding agents can leverage the Agent Kit to perform intelligent database operations, schema discovery, and query optimization with Azure Cosmos DB.",
    events: [
      {
        name: "Azure Developers Show",
        location: "Microsoft, Virtual Event",
        date: new Date(2026, 6, 10),
      },
    ],
    recordingURL: "https://www.youtube.com/watch?v=GWid8x3i9Cc",
    slidesURL: "",
    topics: ["AI", "Databases"],
  },
  {
    title:
      "Build an AI Agent for Azure Cosmos DB in Minutes — MCP Toolkit Demo",
    description:
      "A quick demo showing how to build an AI Agent for Azure Cosmos DB in minutes using the MCP Toolkit.",
    events: [
      {
        name: "YouTube Shorts",
        location: "Virtual",
        date: new Date(2026, 6, 15),
      },
    ],
    recordingURL: "https://www.youtube.com/watch?v=OavlXIixpro",
    slidesURL: "",
    topics: ["AI", "Databases", "Shorts"],
  },
  {
    title:
      "Azure Cosmos DB Shell: From NuGet to MCP in 2 Minutes | Public Preview",
    description:
      "See how to go from NuGet to MCP in just 2 minutes with Azure Cosmos DB Shell, now in Public Preview.",
    events: [
      {
        name: "YouTube Shorts",
        location: "Virtual",
        date: new Date(2026, 6, 15),
      },
    ],
    recordingURL: "https://www.youtube.com/watch?v=yCWn0Qey978",
    slidesURL: "",
    topics: ["AI", "Databases", "Shorts"],
  },
  {
    title: "Agentic Coding with Azure Cosmos DB: From Idea to Working App",
    description:
      "Discover how to leverage agentic coding workflows with Azure Cosmos DB to go from idea to a fully working application. Learn how AI-powered development tools can accelerate your database-driven app development process.",
    events: [
      {
        name: "Agentic Coding with Azure Cosmos DB: From Idea to Working App",
        location: "Microsoft Reactor, Virtual Event",
        date: new Date(2026, 5, 19),
      },
    ],
    recordingURL: "https://www.youtube.com/watch?v=ST8lvhD9d_M",
    slidesURL: "",
    topics: ["AI", "Databases"],
  },
  {
    title: "Powering Coding Agents with Azure Cosmos DB Agent Kit",
    description:
      "Explore how to power coding agents with the Azure Cosmos DB Agent Kit, enabling AI-driven workflows that interact with your data seamlessly for building intelligent, agent-powered applications.",
    events: [
      {
        name: "Microsoft Azure Skillup Tamilnadu Session 6",
        location: "Chennai, India",
        date: new Date(2026, 5, 13),
      },
    ],
    recordingURL: "",
    slidesURL: "https://cosmosdbagentkit2026.z13.web.core.windows.net/",
    topics: ["AI", "Databases", "Conference"],
  },
  {
    title: "Azure Cosmos DB Dev Environment with AI",
    description:
      "Explore how to set up and optimize your Azure Cosmos DB development environment with AI-powered tools and workflows to boost productivity and streamline your database development experience.",
    events: [
      {
        name: "Azure Cosmos DB Dev Environment with AI",
        location: "Azure Cosmos DB Live, Virtual Event",
        date: new Date(2026, 4, 22),
      },
    ],
    recordingURL: "https://www.youtube.com/watch?v=PrO_42ZC_1M",
    slidesURL: "",
    topics: ["AI", "Databases"],
  },
  {
    title: "How MCP Unlocks Smarter Developer Workflows",
    description:
      "Discover how the Model Context Protocol (MCP) is transforming developer workflows by enabling AI agents to interact seamlessly with tools, data, and services. Learn how MCP unlocks smarter, more productive ways to build modern applications.",
    events: [
      {
        name: "FOSSASIA Summit 2026",
        location: "Bangkok, Thailand",
        date: new Date(2026, 2, 13),
      },
    ],
    recordingURL: "https://www.youtube.com/watch?v=bXvHFUDAIVY",
    slidesURL: "",
    topics: ["AI", "Conference"],
  },
  {
    title: "Supercharging AI Agents with the Azure Cosmos DB MCP Toolkit",
    description:
      "In this session, we'll explore the full toolkit experience, supported capabilities like CRUD operations, schema discovery, text search, and vector querying, and how it enables RAG and agent-driven workflows instantly. We'll walk through how the MCP toolkit integrates seamlessly with Microsoft Azure AI Foundry, allowing developers to build production-grade AI agents that can reason over real application data with enterprise security, Entra ID authentication, and minimal code.",
    events: [
      {
        name: "Azure Cosmos DB MCP Toolkit Deep Dive",
        location: "Azure Cosmos DB Live, Virtual Event",
        date: new Date(2026, 0, 30),
      },
    ],
    recordingURL: "https://www.youtube.com/watch?v=6rPFDDJh3as",
    slidesURL: "",
    topics: ["AI", "Databases"],
  },
  {
    title: "What's New in Azure Cosmos DB JavaScript SDK V4",
    description:
      "We will walk you through a multi-agent application in C# that is built on top of the Semantic Kernel framework. You will understand the concepts behind agentic applications, understand the implementation details and nuances, and learn how to integrate Azure Cosmos DB as the database for various use-cases.",
    events: [
      {
        name: "This session explores the key features of SDK v4, highlighting its fully modular architecture that allows selective imports for optimized builds",
        location: "Azure Cosmos DB Live, Virtual Event",
        date: new Date(2025, 4, 16),
      },
    ],
    recordingURL: "https://www.youtube.com/watch?v=3Q8OPpTi7kg",
    slidesURL: "",
    topics: ["Databases", "JavaScript"],
  },
  {
    title:
      "Semantic Kernel with C# to build multi-agent AI applications powered by Azure Cosmos DB",
    description:
      "We will walk you through a multi-agent application in C# that is built on top of the Semantic Kernel framework. You will understand the concepts behind agentic applications, understand the implementation details and nuances, and learn how to integrate Azure Cosmos DB as the database for various use-cases.",
    events: [
      {
        name: "Semantic Kernel with C# to build multi-agent AI applications powered by Azure Cosmos DB",
        location: "Azure Cosmos DB Live, Virtual Event",
        date: new Date(2025, 4, 16),
      },
    ],
    recordingURL: "https://youtu.be/UMgsYdmslSo",
    slidesURL: "",
    topics: ["AI", "Databases"],
  },
  {
    title: "Azure Cosmos DB Live - February 2025",
    description:
      "Dive into the world of Azure Cosmos DB with the JavaScript SDK in this session, Zero to Hero. Learn how to get started, explore key features, and build your first app effortlessly. we'll walk through a sample application that demonstrates how quickly and easily you can harness the power of Azure Cosmos DB Javascript SDK for your projects. Whether you're a beginner or seeking to refine your skills, this talk has you covered!",
    events: [
      {
        name: "Zero to Hero with Azure Cosmos DB JavaScript SDK",
        location: "Azure Cosmos DB Live, Virtual Event",
        date: new Date(2025, 2, 20),
      },
    ],
    recordingURL: "https://www.youtube.com/watch?v=KipU6tiv2JU",
    slidesURL: "https://slides.com/sajeetharan/zero-hero-js-sdk",
    topics: ["Databases", "JavaScript"],
  },
  {
    title: "Google DevFest 2024 - Main Talk",
    description:
      "Join Angular expert Sajeetharan Sinnathurai at DevFest 2024 as he unveils the latest features in Angular and demonstrates powerful strategies for creating reusable libraries. Discover how to maximize code efficiency with the 'Code Once, Conquer Everywhere' approach. Learn practical tips for building scalable, maintainable Angular libraries that can power multiple applications while reducing development time and technical debt.",
    events: [
      {
        name: "What's New and How to 'Code Once, Conquer Everywhere' with Libraries",
        location: "Colombo, Sri Lanka",
        date: new Date(2024, 12, 8),
      },
    ],
    recordingURL: "https://www.youtube.com/watch?v=fMCxk-c1p6Q&t",
    slidesURL: "https://slides.com/sajeetharan/devfest-main-talk",
    topics: ["Conference", "JavaScript"],
  },
  {
    title: "Google DevFest 2024 - Workshop",
    description:
      "Workshop for beginners on Angular to understand Concepts of Angular along with the practical implementation of the same.",
    events: [
      {
        name: "Getting Angular app Up and Running with Standalone Components",
        location: "Colombo,Sri Lanka",
        date: new Date(2024, 12, 7),
      },
    ],
    recordingURL: "",
    slidesURL: "https://slides.com/sajeetharan/devfestr2024-codelabs",
    topics: ["Conference", "JavaScript"],
  },
  {
    title: "NIBM - Workshop",
    description: "Boosting Developer productivity with Microsoft Copilot",
    events: [
      {
        name: "Boosting Developer productivity with Microsoft Copilot",
        location: "Colombo,Sri Lanka",
        date: new Date(2024, 11, 1),
      },
    ],
    recordingURL: "",
    slidesURL: "https://slides.com/sajeetharan/nibm_copilot",
    topics: ["AI", "Workshop"],
  },
  {
    title: "City JS Conference 2024",
    description:
      "Let's talk about latest and greatest features of Javascript SDK and AI integration with Azure Cosmos DB. We will also discuss about how to build scalable and resilient applications with JavaScript and Azure Cosmos DB.",
    events: [
      {
        name: "Building Scalable and Resilient Applications with JavaScript and Azure Cosmos DB",
        location: "Singapore",
        date: new Date(2024, 7, 24),
      },
    ],
    recordingURL: "https://www.youtube.com/watch?v=2qXpF0GdI9U",
    slidesURL: "",
    topics: ["Conference", "Databases", "JavaScript"],
  },
];

const title = "Talks | Sajeetharan Sinnathurai";
const description =
  "Conference talks and sessions by Sajeetharan on Azure Cosmos DB, Coding Agents, Developer Tooling, GitHub Copilot, NoSQL databases, and Developer Experience.";

const allTopics = Array.from(
  new Set(talks.flatMap((t) => t.topics || [])),
).sort();

export default function Talks(): JSX.Element {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const filteredTalks = useMemo(
    () =>
      selectedTopic
        ? talks.filter((t) => t.topics?.includes(selectedTopic))
        : talks,
    [selectedTopic],
  );

  return (
    <Layout title={title} description={description}>
      <main className="container container--fluid margin-vert--lg">
        <h1>{title}</h1>
        <p>{description}</p>

        <div
          className="card margin-bottom--lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(124,58,237,0.1))",
            border: "1px solid rgba(6,182,212,0.3)",
            padding: "1.5rem",
          }}
        >
          <h3 style={{ marginBottom: "0.75rem" }}>📅 Upcoming Events</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div>
                <strong>Azure Cosmos DB Live — August 2026</strong>
                <br />
                <span
                  style={{
                    color: "var(--ifm-color-emphasis-600)",
                    fontSize: "0.9rem",
                  }}
                >
                  Azure Cosmos DB Live, Virtual Event
                </span>
              </div>
              <span
                className="badge badge--primary"
                style={{ fontSize: "0.8rem" }}
              >
                Coming Soon
              </span>
            </div>
          </div>
        </div>

        <div
          className="margin-bottom--md"
          style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}
        >
          <button
            className={`button button--sm margin-right--sm margin-bottom--sm ${
              selectedTopic === null
                ? "button--primary"
                : "button--secondary button--outline"
            }`}
            onClick={() => setSelectedTopic(null)}
          >
            All
          </button>
          {allTopics.map((topic) => (
            <button
              key={topic}
              className={`button button--sm margin-right--sm margin-bottom--sm ${
                selectedTopic === topic
                  ? "button--primary"
                  : "button--secondary button--outline"
              }`}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="row">
          {filteredTalks.map((talkData) => (
            <Talk key={talkData.title} {...talkData} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
