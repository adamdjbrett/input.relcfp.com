const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const addHash = require("./_11ty/helpers/addHash");
const readableDate = require("./_11ty/helpers/readableDate");
const minifyHTML = require("./_11ty/helpers/minifyHTML");
const siteConfig = require("./content/_data/siteConfig");
const minifyXML = require("./_11ty/helpers/minifyXML");

module.exports = function (eleventyConfig) {
  // --- Copy assets

  eleventyConfig.addPassthroughCopy({
    assets: ".",
    "assets/images": "images",
    "assets/js": "js",
  });

  // --- Layout aliases

  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("index", "layouts/index.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");

  // --- Filters

  eleventyConfig.addFilter("addHash", addHash);
  eleventyConfig.addFilter("readableDate", readableDate);
  eleventyConfig.addFilter(
    "alwaysProductionUrl",
    (path) => new URL(path, siteConfig.url)
  );

  // --- Plugins

  eleventyConfig.addPlugin(faviconsPlugin, {
    manifestData: {
      name: siteConfig.title,
      lang: siteConfig.language,
      short_name: siteConfig.title,
      description: siteConfig.description,
      start_url: "/",
      scope: "/",
      display: "standalone",
      theme_color: "#191818",
      background_color: "#191818",
      orientation: "any",
    },
  });

  // --- Transforms

  // Skip minification on the dev server: faster, readable rebuilds
  if (process.env.ELEVENTY_RUN_MODE !== "serve") {
    eleventyConfig.addTransform("minifyHTML", minifyHTML);
    eleventyConfig.addTransform("minifyXML", minifyXML);
  }

  // --- Dev server: sass writes straight to _site/css, so reload on it
  eleventyConfig.setServerOptions({ watch: ["_site/css/**/*.css"] });

  return {
    dir: {
      input: "content",
    },
    templateFormats: ["md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
