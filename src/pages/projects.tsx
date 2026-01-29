import React from "react";
import Layout from "@theme/Layout";

import { Project, ProjectData } from "../components/projects/Project";

const assetsDir = "./assets/projects";
const projects: ProjectData[] = [
  {
    title: "Angular Agent Kit",
    description:
      "A collection of AI coding agent skills for Angular development. Contains 45+ performance optimization rules across 8 categories. Works with GitHub Copilot, Claude Code, Cursor, and Gemini CLI.",
    url: "https://github.com/sajeetharan/angular-agent-kit",
    image: require("../../blog/2026/01/2026-01-30-introducing-angular-agent-kit/images/angular-agent-kit.jpg"),
    role: "Author",
  },
  {
    title: "Azure SDK for JavaScript",
    description:
      "This repository is for active development of the Azure SDK for JavaScript (NodeJS & Browser). ",
    url: "https://github.com/Azure/azure-sdk-for-js",
    image: require(`${assetsDir}/cosmos-js-sdk.png`),
    role: "Contributor",
  },
  {
    title: "Data Api Builder",
    description:
      "Data API builder provides modern REST and GraphQL endpoints to your Azure Databases and on-prem stores.",
    url: "https://github.com/Azure/data-api-builder",
    image: require(`${assetsDir}/data-api-builder.png`),
    role: "Contributor",
  },
  {
    title: "Azure Cosmos DB MCP Toolkit",
    description:
      "A comprehensive toolkit for Azure Cosmos DB that provides tools, utilities, and resources to enhance developer productivity and streamline database operations.",
    url: "https://github.com/AzureCosmosDB/MCPToolKit",
    image: "/img/cosmos-toolkit.png",
    role: "Author",
  },
  {
    title: "Azure Cosmos DB Agent Kit",
    description:
      "A collection of AI coding agent skills for Azure Cosmos DB. Contains 45+ performance optimization rules across 8 categories covering data modeling, partition keys, queries, and SDK best practices.",
    url: "https://github.com/AzureCosmosDB/cosmosdb-agent-kit",
    image: require(`${assetsDir}/cosmosdb-agent-kit.jpg`),
    role: "Author",
  },
  {
    title: "Cosmos Graphic",
    description:
      "A visualization and graphics library for Azure Cosmos DB. Provides tools and utilities for creating visual representations of Cosmos DB data and architecture.",
    url: "https://github.com/sajeetharan/cosmos-graphic",
    image: require(`${assetsDir}/cosmos-graphic.png`),
    role: "Author",
  },
  {
    title: "Banking Multi Agent Workshop",
    description:
      "A multi-agent sample and workshop for a retail banking scenario. Implemented in both C# using Semantic Kernel Agents and Python using LangGraph.",
    url: "https://github.com/AzureCosmosDB/banking-multi-agent-workshop",
    image: require(`${assetsDir}/multi-agent.png`),
    role: "Contributor",
  },
  {
    title: "Developer.AzureCosmosDB.com",
    description: "Code and content for https://developer.azurecosmosdb.com",
    url: "https://github.com/AzureCosmosDB/cosmosweb",
    image: require(`${assetsDir}/developer-cosmos.png`),
    role: "Contributor",
  },
  {
    title: "Azure Cosmos DB Gallery",
    description:
      "One-stop for everything Azure Cosmos DB. Code samples, docs, videos, decks, etc. Everything in one location. Community contributions are welcome.",
    url: "https://github.com/AzureCosmosDB/gallery",
    image: require(`${assetsDir}/gallery-social.png`),
    role: "Author",
  },
  {
    title: "Angular Visual Storybook",
    description:
      "An interactive learning resource with 26 beautifully designed infographics covering all Angular concepts from basics to advanced topics like SSR, performance optimization, and AI integration.",
    url: "https://sajeetharan.github.io/angular-graphic/",
    image: require("../../blog/2025/12/2025-12-15-introducing-angular-visual-storybook/images/angular-visual-storybook.jpg"),
    role: "Author",
  },
  {
    title: "Azure Cosmos DB MCP server sample",
    description:
      "A Model Context Protocol (MCP) server that provides secure access to Azure Cosmos DB datasets. Enables Large Language Models (LLMs) to safely query and analyze data through a standardized interface.",
    url: "https://github.com/AzureCosmosDB/azure-cosmos-mcp-server",
    image: require(`${assetsDir}/mcp-cosmos.png`),
    role: "Author",
  },
];

const title = "Projects";
const description = "Featured Projects I was/am involved in.";

export default function Projects(): JSX.Element {
  return (
    <Layout title={title} description={description}>
      <main className="container margin-vert--lg">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <header style={{ marginBottom: "3rem", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "2.5rem",
                marginBottom: "1rem",
                fontWeight: 700,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "1.15rem",
                color: "var(--ifm-color-emphasis-700)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              {description}
            </p>
          </header>

          <div className="row">
            {projects.map((project) => (
              <Project key={project.title} {...project} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
