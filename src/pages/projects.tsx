import React from "react";
import Layout from "@theme/Layout";

import { Project, ProjectData } from "../components/projects/Project";

const assetsDir = "./assets/projects";
const projects: ProjectData[] = [
  {
    title: "Azure Cosmos DB MCP server sample",
    description:
      "A Model Context Protocol (MCP) server that provides secure access to Azure Cosmos DB datasets. Enables Large Language Models (LLMs) to safely query and analyze data through a standardized interface.",
    url: "https://github.com/AzureCosmosDB/azure-cosmos-mcp-server",
    image: require(`${assetsDir}/mcp-cosmos.png`),
    role: "Author",
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
    title: "Data Api Builder",
    description:
      "Data API builder provides modern REST and GraphQL endpoints to your Azure Databases and on-prem stores.",
    url: "https://github.com/Azure/data-api-builder",
    image: require(`${assetsDir}/data-api-builder.png`),
    role: "Contributor",
  },
  {
    title: "Azure SDK for JavaScript",
    description:
      "This repository is for active development of the Azure SDK for JavaScript (NodeJS & Browser). ",
    url: "https://github.com/Azure/azure-sdk-for-js",
    image: require(`${assetsDir}/cosmos-js-sdk.png`),
    role: "Contributor",
  },
];

const title = "Projects";
const description = "Featured Projects I was/am involved in.";

export default function Projects(): JSX.Element {
  return (
    <Layout title={title} description={description}>
      <main className="container container--fluid margin-vert--lg">
        <h1>{title}</h1>
        <p>{description}</p>

        <div className="row">
          {projects.map((project) => (
            <Project key={project.title} {...project} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
