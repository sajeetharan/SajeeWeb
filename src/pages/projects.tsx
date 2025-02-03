import React from "react";
import Layout from "@theme/Layout";

import { Project, ProjectData } from "../components/projects/Project";

const assetsDir = "./assets/blogs";
const projects: ProjectData[] = [
  {
    title: "Botkube",
    description:
      "Monitor and act on your Kubernetes cluster from your favorite chat platforms.",
    url: "https://botkube.io/",
    image: require(`${assetsDir}/botkube.png`),
    role: "Maintainer",
  }
];

const title = "Blogs";
const description = "Featured Blogs I was/am involved in.";

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
