const packageJson = require("../../package.json");

module.exports = {
  title: "Input 4 RELCFP",
  description: "the input feeds used for religion call for papers",
  author: "Multiple Authors",
  url: "https://input.relcfp.com",
  github: {
    project: "https://github.com/adamdjbrett/input.relcfp.com",
  },
  userAgent: "m10y-input.relcfp.com",
  language: "en",
  generator: {
    name: "Eleventy",
    version: packageJson.dependencies["@11ty/eleventy"].replace("^", ""),
  },
  dateFormats: {
    readable: "d LLL yyyy", // date format used alongside posts
  },
  maxPostLength: 500, // How many characters per each post excerpt?
  maxItemsPerFeed: 10, // How many items should be fetched from each feed?
  enablePWA: true, // If true, service worker is registered to make the site behave like a mobile app (PWA)
  localCacheDuration: "7d", // For how long should network calls be cached locally? See https://www.11ty.dev/docs/plugins/fetch/#change-the-cache-duration
};
