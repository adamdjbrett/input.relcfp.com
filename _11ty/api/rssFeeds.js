const EleventyFetch = require("@11ty/eleventy-fetch");
const feedExtractor = import("@extractus/feed-extractor");
const siteMetadata = require("./siteMetadata");
const logger = require("../helpers/logger");
const { ELEVENTY_FETCH_OPTIONS } = require("../constants");
const getFulfilledValues = require("../helpers/getFulfilledValues");
const siteConfig = require("../../content/_data/siteConfig");
const stripAndTruncateHTML = require("../helpers/stripAndTruncateHTML");
const upennUpdatedDates = require("../helpers/upennUpdatedDates");

// Merge a site's page "updated:" dates into its feed entries: a post on both
// takes the later date, a bumped post only on the page is added.
const mergePageDates = async (site, articles) => {
  try {
    const html = await EleventyFetch(site.url, {
      ...ELEVENTY_FETCH_OPTIONS,
      type: "text",
    });
    const byLink = new Map(articles.map((item) => [item.link, item]));

    upennUpdatedDates(html).forEach((pageItem) => {
      const feedItem = byLink.get(pageItem.link);

      if (!feedItem) {
        byLink.set(pageItem.link, {
          ...pageItem,
          description: stripAndTruncateHTML(
            pageItem.description,
            siteConfig.maxPostLength
          ),
        });
      } else if (new Date(pageItem.published) > new Date(feedItem.published)) {
        feedItem.published = pageItem.published;
      }
    });

    return [...byLink.values()];
  } catch (error) {
    logger.warn(
      `[${site.file}] Could not read updated dates from ${site.url} - using feed dates only (${error.message})`
    );
    return articles;
  }
};

module.exports = async () => {
  const rssFeedSites = siteMetadata().filter((site) => site.feedType === "rss");
  const { extractFromXml } = await feedExtractor;

  const feedContents = await rssFeedSites.map(async (site) => {
    try {
      const feedData = await EleventyFetch(site.feed, {
        ...ELEVENTY_FETCH_OPTIONS,
        type: "text",
      });

      const { entries } = extractFromXml(feedData);

      const feedArticles = entries
        .map((item) => ({
          title: item.title || siteConfig.defaultArticleTitle,
          link: item.link,
          published: item.published || new Date().toISOString(),
          description: stripAndTruncateHTML(
            item.description,
            siteConfig.maxPostLength
          ),
        }));

      const articles = (
        site.pageDates
          ? await mergePageDates(site, feedArticles)
          : feedArticles
      )
        .sort((a, b) => new Date(b.published) - new Date(a.published))
        .slice(0, siteConfig.maxItemsPerFeed);

      return {
        ...site,
        articles,
      };
    } catch (error) {
      logger.error(
        `[${site.file}] Error processing RSS/Atom feed: ${site.feed} (${error.cause?.cause?.message || error.message})`
      );
    }
  });

  return getFulfilledValues(feedContents);
};
