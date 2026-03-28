# Input feeds for [Religion Call For Papers (relcfp)](https://relcfp.com)
[![Update site](https://github.com/adamdjbrett/input.relcfp.com/actions/workflows/scheduled_build.yml/badge.svg)](https://github.com/adamdjbrett/input.relcfp.com/actions/workflows/scheduled_build.yml)[![Netlify Status](https://api.netlify.com/api/v1/badges/a04604de-f7c5-45c1-a879-90f96150c2c2/deploy-status)](https://app.netlify.com/sites/input-relcfp/deploys)

* * * 

## Multiplicity - RSS Aggregator Starter Based On Eleventy

**Multiplicity** (abbreviated as 'm10y') is a simple starter pack based on [Eleventy static site generator](https://11ty.dev) that allows you to create RSS aggregator site.

Alongside the template code, it also contains a GitHub action required to keep the site up to date.

[View demo](https://eleventy-m10y.lkmt.us/)

Want to see in in action? Check out [Blogworm.eu](https://blogworm.eu/).

### Instant deploy

Netlify:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/lwojcik/eleventy-template-multiplicity)

Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lwojcik/eleventy-template-multiplicity)

Render:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/lwojcik/eleventy-template-multiplicity)

### Features

- light / dark mode switcher + honoring color scheme preference
- pagination
- translation ready (separate file with static phrases)
- automatic favicon generation
- support for RSS and JSON feeds
- custom avatar alongside each feed item

### Setup and personalization

1. Fork the repository.
2. Configure the site according to your preferences - see [`siteConfig.js`](./content/_data/siteConfig.js) and template files.
3. Modify the list of feeds you want to aggregate - they are located in [`content/sites`](./content/sites/).
   1. Each site has the following properties:
      - `name` - name of the site
      - `url` - URL of the site
      - `avatar` - image to display alongside the site name (e.g. favicon). During the build process the image will be downloaded, resized and served locally
      - `feed` - URL of the RSS or JSON feed to fetch articles from
      - `hideFromSiteList` - set it to `true` if you want to hide this site from the list of sites on the Sites page. It is useful if you want to add two sites with different RSS feeds under the same name and avoid seeing duplicates on the list
4. Deploy the site to Netlify or Vercel
5. Set up the GitHub action in [`.github/workflows/scheduled_build.yml`](./.github/workflows/scheduled_build.yml):
   1. Create a build hook URL and save it as a GitHub secret in your repository - e.g. `NETLIFY_BUILD_HOOK_URL` or `VERCEL_BUILD_HOOK_URL`
6. Done! Your aggregator is up and running.

### Translation file

See [`phrases.js`](./content/_data/phrases.js) for the list of translatable static phrases.

### Note for Netlify users

The aggregator uses [eleventy-fetch](https://www.11ty.dev/docs/plugins/fetch/) plugin for fetching and caching network requests. If you use Netlify, you can limit number of network requests with Netlify cache mechanism - [see Eleventy docs on how to enable it](https://www.11ty.dev/docs/plugins/fetch/#running-this-on-your-build-server).

### Contributions

Contributions of the following kind are welcome:

- bug reports / fixes
- feature suggestions / improvements of existing features

Before contributing be sure to read [Code of Conduct](./CODE_OF_CONDUCT.md).
## Github Workflow run log
- update completed 2026-03-04-06-13-35
- update completed 2026-03-04-16-12-09
- update completed 2026-03-05-06-15-41
- update completed 2026-03-05-16-17-24
- update completed 2026-03-06-06-14-00
- update completed 2026-03-06-16-10-22
- update completed 2026-03-07-06-08-51
- update completed 2026-03-07-16-04-41
- update completed 2026-03-08-06-12-18
- update completed 2026-03-08-16-04-39
- update completed 2026-03-09-06-21-07
- update completed 2026-03-09-16-20-53
- update completed 2026-03-10-06-13-56
- update completed 2026-03-10-16-21-08
- update completed 2026-03-11-06-15-30
- update completed 2026-03-11-16-17-20
- update completed 2026-03-12-06-16-55
- update completed 2026-03-12-16-22-25
- update completed 2026-03-13-06-16-04
- update completed 2026-03-13-16-10-41
- update completed 2026-03-14-06-14-35
- update completed 2026-03-14-16-06-22
- update completed 2026-03-15-06-19-51
- update completed 2026-03-15-16-06-17
- update completed 2026-03-16-06-31-03
- update completed 2026-03-16-16-22-34
- update completed 2026-03-17-06-22-29
- update completed 2026-03-17-16-24-09
- update completed 2026-03-18-06-22-49
- update completed 2026-03-18-16-23-26
- update completed 2026-03-19-06-20-30
- update completed 2026-03-19-16-18-35
- update completed 2026-03-20-06-17-20
- update completed 2026-03-20-16-13-33
- update completed 2026-03-21-06-11-48
- update completed 2026-03-21-16-05-10
- update completed 2026-03-22-06-16-32
- update completed 2026-03-22-16-05-32
- update completed 2026-03-23-06-24-55
- update completed 2026-03-23-16-19-27
- update completed 2026-03-24-06-22-32
- update completed 2026-03-24-16-22-59
- update completed 2026-03-25-06-22-33
- update completed 2026-03-25-16-26-11
- update completed 2026-03-26-06-24-48
- update completed 2026-03-26-16-26-13
- update completed 2026-03-27-06-25-26
- update completed 2026-03-27-16-17-44
- update completed 2026-03-28-06-20-03
