const { DateTime } = require("luxon");

// UPenn CFP category pages sort by a poster-set "updated:" field, which the
// taxonomy RSS feed (ordered by creation date) never exposes. This reads it
// from the category page so bumped posts surface like they do on UPenn.

const ORIGIN = "https://call-for-papers.sas.upenn.edu";
const DATE_FORMAT = "cccc, LLLL d, yyyy - h:mma";

const ARTICLE_RE =
  /<h2 class="node-title"><a href="\/node\/(\d+)">([\s\S]*?)<\/a>[\s\S]*?field-name-field-cfp-updated[\s\S]*?date-display-single">([^<]+)<([\s\S]*?)<\/article>/g;
const CONTENT_RE =
  /field-name-field-cfp-content[\s\S]*?<div class="field-item even">([\s\S]*)/;

const decode = (str) =>
  str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

module.exports = (html, now = DateTime.now()) =>
  [...html.matchAll(ARTICLE_RE)]
    .map(([, node, title, updated, rest]) => ({
      link: `${ORIGIN}/node/${node}`,
      title: decode(title),
      updated: DateTime.fromFormat(updated.trim(), DATE_FORMAT, {
        zone: "America/New_York",
      }),
      description: rest.match(CONTENT_RE)?.[1] || "",
    }))
    // ponytail: future "updated" dates are poster typos (e.g. 2027) and would
    // pin a post to the top for a year, so they're dropped rather than guessed
    .filter(({ updated }) => updated.isValid && updated <= now)
    .map(({ updated, ...item }) => ({ ...item, published: updated.toUTC().toISO() }));

if (require.main === module) {
  const assert = require("assert");
  const article = (node, title, updated) =>
    `<article><h2 class="node-title"><a href="/node/${node}">${title}</a></h2>
    <div class="field field-name-field-cfp-updated"><span class="date-display-single">${updated}</span></div>
    <div class="field field-name-field-cfp-content"><div class="field-items"><div class="field-item even"><p>Body ${node}</p></div></div></div>
    </article>`;
  const html =
    article(1, "Typo &amp; future", "Sunday, September 5, 2027 - 10:00am") +
    article(2, "Bumped", "Wednesday, September 30, 2026 - 10:15pm");
  const items = module.exports(html, DateTime.fromISO("2026-10-03T00:00:00Z"));
  assert.strictEqual(items.length, 1);
  assert.strictEqual(items[0].link, `${ORIGIN}/node/2`);
  assert.strictEqual(items[0].title, "Bumped");
  assert.strictEqual(items[0].published, "2026-10-01T02:15:00.000Z");
  assert.match(items[0].description, /Body 2/);
  console.log("upennUpdatedDates ok");
}
