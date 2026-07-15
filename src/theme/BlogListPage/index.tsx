import React, { useState, useMemo } from "react";
import clsx from "clsx";
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";
import type { Props } from "@theme/BlogListPage";
import styles from "./styles.module.scss";

type ViewMode = "list" | "grid";

const INITIAL_VISIBLE_TAGS = 15;
const POSTS_PER_PAGE = 12;

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
  const { items } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showAllTags, setShowAllTags] = useState(false);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  // Extract all unique tags (with counts) and years from ALL posts
  const { tagCounts, sortedTags, allYears } = useMemo(() => {
    const tagMap = new Map<string, number>();
    const years = new Set<string>();
    items.forEach(({ content }) => {
      content.metadata.tags.forEach((tag) => {
        tagMap.set(tag.label, (tagMap.get(tag.label) || 0) + 1);
      });
      const date = new Date(content.metadata.date);
      years.add(date.getFullYear().toString());
    });
    // Sort tags by count (descending), then alphabetically
    const sorted = Array.from(tagMap.entries()).sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    );
    return {
      tagCounts: tagMap,
      sortedTags: sorted,
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
          tag.label.toLowerCase().includes(query),
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
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
    setVisibleCount(POSTS_PER_PAGE);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedYear("all");
    setVisibleCount(POSTS_PER_PAGE);
  };

  const hasActiveFilters =
    searchQuery || selectedTags.length > 0 || selectedYear !== "all";

  const visibleTags = showAllTags
    ? sortedTags
    : sortedTags.slice(0, INITIAL_VISIBLE_TAGS);
  const hiddenTagCount = sortedTags.length - INITIAL_VISIBLE_TAGS;

  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  return (
    <BlogLayout>
      <div className={styles.blogListPage}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            {items.length} posts on developer tooling, Azure, coding agents, and
            more — writing since 2011.
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(POSTS_PER_PAGE);
              }}
              className={styles.searchInput}
            />
          </div>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setVisibleCount(POSTS_PER_PAGE);
            }}
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
                viewMode === "list" && styles.viewBtnActive,
              )}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="18"
                height="18"
              >
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
                viewMode === "grid" && styles.viewBtnActive,
              )}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="18"
                height="18"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tag Cloud */}
        {sortedTags.length > 0 && (
          <div className={styles.tagCloud}>
            <div className={styles.tagCloudHeader}>
              <span className={styles.tagCloudLabel}>Filter by tag</span>
              {selectedTags.length > 0 && (
                <button
                  className={styles.clearTagsBtn}
                  onClick={() => {
                    setSelectedTags([]);
                    setVisibleCount(POSTS_PER_PAGE);
                  }}
                >
                  Clear ({selectedTags.length})
                </button>
              )}
            </div>
            <div className={styles.tagPills}>
              {visibleTags.map(([tag, count]) => (
                <button
                  key={tag}
                  className={clsx(
                    styles.tagPill,
                    selectedTags.includes(tag) && styles.tagPillActive,
                  )}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  <span className={styles.tagCount}>{count}</span>
                </button>
              ))}
              {!showAllTags && hiddenTagCount > 0 && (
                <button
                  className={styles.showMoreBtn}
                  onClick={() => setShowAllTags(true)}
                >
                  +{hiddenTagCount} more
                </button>
              )}
              {showAllTags && sortedTags.length > INITIAL_VISIBLE_TAGS && (
                <button
                  className={styles.showMoreBtn}
                  onClick={() => setShowAllTags(false)}
                >
                  Show less
                </button>
              )}
            </div>
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
              Clear all filters
            </button>
          </div>
        )}

        {/* Blog Posts */}
        {displayedItems.length > 0 ? (
          <>
            <div
              className={clsx(
                styles.postsContainer,
                viewMode === "grid" && styles.postsGrid,
              )}
            >
              <BlogPostItems items={displayedItems} />
            </div>
            {hasMore && (
              <div className={styles.loadMore}>
                <button
                  className={styles.loadMoreBtn}
                  onClick={() =>
                    setVisibleCount((prev) => prev + POSTS_PER_PAGE)
                  }
                >
                  Load more posts ({filteredItems.length - visibleCount}{" "}
                  remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>
            <p>No posts match your filters.</p>
            <button className={styles.clearBtn} onClick={clearFilters}>
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
