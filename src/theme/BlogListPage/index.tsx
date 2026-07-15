import React, { useState, useMemo } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import BlogListPaginator from "@theme/BlogListPaginator";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";
import type { Props } from "@theme/BlogListPage";
import styles from "./styles.module.scss";

type ViewMode = "list" | "grid";

function BlogListPageMetadata(props: Props): JSX.Element {
  const { metadata } = props;
  const { blogDescription } = metadata;
  return (
    <>
      <PageMetadata title="Blog" description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): JSX.Element {
  const { metadata, items } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Extract all unique tags and years from posts
  const { allTags, allYears } = useMemo(() => {
    const tags = new Set<string>();
    const years = new Set<string>();
    items.forEach(({ content }) => {
      const postTags = content.metadata.tags;
      postTags.forEach((tag) => tags.add(tag.label));
      const date = new Date(content.metadata.date);
      years.add(date.getFullYear().toString());
    });
    return {
      allTags: Array.from(tags).sort(),
      allYears: Array.from(years).sort((a, b) => Number(b) - Number(a)),
    };
  }, [items]);

  // Filter posts
  const filteredItems = useMemo(() => {
    return items.filter(({ content }) => {
      const { title, tags, date, description } = content.metadata;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = title.toLowerCase().includes(query);
        const matchesDesc = description?.toLowerCase().includes(query) || false;
        const matchesTags = tags.some((tag) =>
          tag.label.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesDesc && !matchesTags) return false;
      }

      // Tag filter
      if (selectedTags.length > 0) {
        const postTagLabels = tags.map((t) => t.label);
        if (!selectedTags.some((tag) => postTagLabels.includes(tag)))
          return false;
      }

      // Year filter
      if (selectedYear !== "all") {
        const postYear = new Date(date).getFullYear().toString();
        if (postYear !== selectedYear) return false;
      }

      return true;
    });
  }, [items, searchQuery, selectedTags, selectedYear]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedYear("all");
  };

  const hasActiveFilters =
    searchQuery || selectedTags.length > 0 || selectedYear !== "all";

  return (
    <BlogLayout>
      <div className={styles.blogListPage}>
        {/* Header & Controls */}
        <div className={styles.header}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            Thoughts on developer tooling, Azure, coding agents, and more — writing since 2011.
          </p>
        </div>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          {/* Search */}
          <div className={styles.searchWrapper}>
            <svg
              className={styles.searchIcon}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className={styles.yearSelect}
          >
            <option value="all">All Years</option>
            {allYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className={styles.viewToggle}>
            <button
              className={clsx(
                styles.viewBtn,
                viewMode === "list" && styles.viewBtnActive
              )}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className={clsx(
                styles.viewBtn,
                viewMode === "grid" && styles.viewBtnActive
              )}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tag Pills */}
        {allTags.length > 0 && (
          <div className={styles.tagCloud}>
            {allTags.slice(0, 20).map((tag) => (
              <button
                key={tag}
                className={clsx(
                  styles.tagPill,
                  selectedTags.includes(tag) && styles.tagPillActive
                )}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
            {allTags.length > 20 && (
              <span className={styles.moreTagsHint}>
                +{allTags.length - 20} more
              </span>
            )}
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className={styles.activeFilters}>
            <span className={styles.resultCount}>
              {filteredItems.length} post{filteredItems.length !== 1 ? "s" : ""}{" "}
              found
            </span>
            <button className={styles.clearBtn} onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}

        {/* Blog Posts */}
        {filteredItems.length > 0 ? (
          <div
            className={clsx(
              styles.postsContainer,
              viewMode === "grid" && styles.postsGrid
            )}
          >
            <BlogPostItems items={filteredItems} />
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No posts match your filters.</p>
            <button className={styles.clearBtn} onClick={clearFilters}>
              Clear all filters
            </button>
          </div>
        )}

        {/* Only show paginator when no filters are active */}
        {!hasActiveFilters && <BlogListPaginator metadata={metadata} />}
      </div>
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
