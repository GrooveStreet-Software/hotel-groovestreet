/**
 * build-pages.js
 * Generates the inner pages from index.html's shared shell (header/footer),
 * substituting page-specific <main> content, titles and active nav states.
 * Run: node .kilo/build-pages.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");
const SITE = "https://hotel-groovestreet.netlify.app";
const SHARE_IMAGE = `${SITE}/img/bg-img/1.jpg`;

const shell = fs.readFileSync(INDEX, "utf8");
const MAIN_START = shell.indexOf('<main id="main">');
const MAIN_END = shell.indexOf("</main>") + "</main>".length;

if (MAIN_START < 0 || MAIN_END <= MAIN_START) {
  throw new Error(
    "index.html is missing its <main id=\"main\"> ... </main> block; cannot build pages."
  );
}

// Keep the <main id="main"> … </main> wrapper so every page shares it.
const head = shell.slice(0, MAIN_START) + '<main id="main">';
const tail = "</main>" + shell.slice(MAIN_END);

/** Page definitions — `main` is injected between the shared header and footer. */
const pages = require("./pages");

for (const page of pages) {
  let html = head + page.main + tail;

  // Title + meta description
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${page.title}</title>`
  );
  html = html.replace(
    /<meta name="description"\s+content="[\s\S]*?">/,
    `<meta name="description" content="${page.description}">`
  );

  // Active nav link in the desktop bar
  html = html.replace(
    /<a href="([^"]+)" class="nav-link is-active">[^<]*<\/a>/,
    `<a href="$1" class="nav-link">__</a>`
  );
  if (page.slug) {
    html = html.replace(
      new RegExp(`(<a href="${page.slug}" class="nav-link")>`),
      `$1 is-active>`
    );
  } else {
    html = html.replace(
      /(<a href="index\.html" class="nav-link)>/,
      `$1 is-active>`
    );
  }

  // Structured data describes the hotel itself and belongs to the homepage
  // only; the shell would otherwise stamp it onto all six generated pages.
  html = html.replace(
    /\s*<!-- Structured data: Hotel \/ LodgingBusiness -->[\s\S]*?<\/script>/,
    ""
  );

  // Per-page social share metadata. The shell carries the homepage's values,
  // so every generated page must be re-pointed at its own title, description
  // and URL or all six pages would share one Open Graph object.
  const pageUrl = `${SITE}/${page.slug}`;
  html = html.replace(
    /<meta property="og:title" content="[\s\S]*?">/,
    `<meta property="og:title" content="${page.title}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[\s\S]*?">/,
    `<meta property="og:description" content="${page.description}">`
  );
  html = html.replace(
    /<meta property="og:url" content="[\s\S]*?">/,
    `<meta property="og:url" content="${pageUrl}">`
  );
  html = html.replace(
    /<meta property="og:image" content="[\s\S]*?">/,
    `<meta property="og:image" content="${SHARE_IMAGE}">`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[\s\S]*?">/,
    `<meta name="twitter:title" content="${page.title}">`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[\s\S]*?">/,
    `<meta name="twitter:description" content="${page.description}">`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[\s\S]*?">/,
    `<meta name="twitter:image" content="${SHARE_IMAGE}">`
  );
  html = html.replace(
    /<link rel="canonical" href="[\s\S]*?">/,
    `<link rel="canonical" href="${pageUrl}">`
  );

  // The booking form lives on index.html only, so generated pages must link to it
  // rather than to a "#booking" anchor that does not exist on their own page.
  html = html.replace(/href="#booking"/g, 'href="index.html#booking"');

  fs.writeFileSync(path.join(ROOT, page.slug), html, "utf8");
  console.log("wrote", page.slug);
}
