const definitions = require("../src/data/topics.json");

module.exports = function topicHubs() {
  return {
    name: "topic-hubs",
    getPathsToWatch() {
      return [require.resolve("../src/data/topics.json")];
    },
    async contentLoaded({ allContent, actions }) {
      const blog = allContent["docusaurus-plugin-content-blog"]?.default;
      if (!blog?.blogPosts) {
        throw new Error("Topic hubs require the default Docusaurus blog.");
      }
      for (const { metadata } of blog.blogPosts) {
        const modified = metadata.frontMatter.dateModified;
        if (
          modified !== undefined &&
          (typeof modified !== "string" ||
            !Number.isFinite(Date.parse(modified)) ||
            Date.parse(modified) < new Date(metadata.date).getTime())
        ) {
          throw new Error(
            `Invalid dateModified for ${metadata.permalink}: use an ISO date on or after publication.`,
          );
        }
      }
      const topics = definitions.map((definition) => {
        const posts = blog.blogPosts
          .filter(
            ({ metadata }) => !metadata.unlisted && !metadata.frontMatter.draft,
          )
          .filter(({ metadata }) =>
            metadata.tags.some(({ label }) =>
              definition.tags.includes(
                label.toLowerCase().replace(/[\s_]+/g, "-"),
              ),
            ),
          )
          .map(({ metadata }) => ({
            title: metadata.title,
            description: metadata.description,
            permalink: metadata.permalink,
            date: metadata.date,
          }))
          .sort(
            (a, b) =>
              new Date(b.date) - new Date(a.date) ||
              a.permalink.localeCompare(b.permalink),
          );
        for (const slug of definition.startHere) {
          if (!posts.some((post) => post.permalink.endsWith(`/${slug}`))) {
            throw new Error(
              `Missing start-here article "${slug}" for topic "${definition.slug}".`,
            );
          }
        }
        return { ...definition, posts };
      });
      actions.setGlobalData({ topics });
      for (const topic of [null, ...topics]) {
        const data = await actions.createData(
          `${topic?.slug ?? "index"}.json`,
          JSON.stringify({ topic, topics }),
        );
        actions.addRoute({
          path: topic ? `/topics/${topic.slug}` : "/topics",
          component: "@site/src/components/topics/TopicPage.tsx",
          exact: true,
          modules: { data },
        });
      }
    },
  };
};
