import type definitions from "../../data/topics.json";

export type Topic = (typeof definitions)[number] & {
  posts: {
    title: string;
    description: string;
    permalink: string;
    date: string;
  }[];
};

export type TopicData = { topics: Topic[] };
