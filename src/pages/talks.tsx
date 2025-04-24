import React from "react";
import Layout from "@theme/Layout";

import Talk, { TalkMetadata } from "../components/talks/Talk";

import BuildingGQLAPIForK8sResDescription from "./assets/talks/_building-gql-api-for-k8s-res.md";
import DevTeamCollaborationGitBestPracticesDescription from "./assets/talks/_dev-team-collaboration-git-best-practices.md";
import GraphQLInGoDescription from "./assets/talks/_graphql-in-go.md";

const talks: TalkMetadata[] = [
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
  },
];

const title = "Talks";
const description = "Featured talks I presented on various events.";

export default function Talks(): JSX.Element {
  return (
    <Layout title={title} description={description}>
      <main className="container container--fluid margin-vert--lg">
        <h1>{title}</h1>
        <p>{description}</p>

        <div className="row">
          {talks.map((talkData) => (
            <Talk key={talkData.title} {...talkData} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
