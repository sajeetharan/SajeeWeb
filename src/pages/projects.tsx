import React from "react";
import Layout from "@theme/Layout";

import { Project, ProjectData } from "../components/projects/Project";

const assetsDir = "./assets/projects";
const projects: ProjectData[] = [
  {
    title: "Azure Cosmos DB MCP Toolkit",
    description:
      "A comprehensive toolkit for Azure Cosmos DB that provides tools, utilities, and resources to enhance developer productivity and streamline database operations.",
    url: "https://github.com/AzureCosmosDB/MCPToolKit",
    image: "/img/cosmos-toolkit.png",
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
  {
    title: "Azure Cosmos DB Gallery",
    description:
      "One-stop for everything Azure Cosmos DB. Code samples, docs, videos, decks, etc. Everything in one location. Community contributions are welcome.",
    url: "https://github.com/AzureCosmosDB/gallery",
    image: require(`${assetsDir}/gallery-social.png`),
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
    title: "Angular Graphic",
    description:
      "A collection of Angular components and directives for building interactive graphics and visualizations in Angular applications.",
    url: "https://github.com/sajeetharan/angular-graphic",
    image: require(`${assetsDir}/angular-graphic.png`),
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
  {
    title: "Azure Mindmap",
    description:
      "Solution Architecture Patterns and Checklists Mind Map for beginners on Azure",
    url: "https://github.com/sajeetharan/azure-mindmap",
    image: require(`${assetsDir}/azure-mindmap.png`),
    role: "Author",
  },
  {
    title: "Azure Function CosmosDB CRUD",
    description:
      "Sample Demonstration using azure cosmosdb and azure function CRUD operation",
    url: "https://github.com/sajeetharan/AzureFunctionCosmosDBCrud",
    image: require(`${assetsDir}/azure-function-cosmosdb.png`),
    role: "Author",
  },
  {
    title: "Angular Structure",
    description:
      "Recommended structure for your Angular App",
    url: "https://github.com/sajeetharan/Angular-Structure",
    image: require(`${assetsDir}/angular-structure.png`),
    role: "Author",
  },
  {
    title: "D3 Angular Directives",
    description:
      "This repository gives you the directives written in angular for various d3 visualizations",
    url: "https://github.com/sajeetharan/d3AngularDirectives",
    image: require(`${assetsDir}/d3-angular.png`),
    role: "Author",
  },
  {
    title: "GitHub Action Angular",
    description:
      "Demo application showcasing GitHub Actions CI/CD pipeline with Angular applications",
    url: "https://github.com/sajeetharan/github_action_angular",
    image: require(`${assetsDir}/github-action.png`),
    role: "Author",
  },
  {
    title: "Postman GitHub GraphQL",
    description:
      "This is a demo application to demonstrate the capabilities of Postman with Graphql at Postman API Day 2023",
    url: "https://github.com/sajeetharan/Postman-github-graphql",
    image: require(`${assetsDir}/postman-graphql.png`),
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
