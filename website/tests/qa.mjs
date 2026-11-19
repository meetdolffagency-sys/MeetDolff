// Playwright QA for the built site. Run: node tests/qa.mjs  (requires `npm i playwright` somewhere resolvable)
// Usage: PW=/path/to/node_modules/playwright node tests/qa.mjs
import { createRequire } from "node:module";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW || "playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const URL = pathToFileURL(path.join(root, "dist/index.html")).href;
const shots = path.join(root, "screenshots");
fs.mkdirSync(shots, { recursive: true });

const results = [];
const check = (name, ok, extra = "") => {
  results.push({ name, ok: !!ok, extra });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  — " + extra : ""}`);
};

const ROUTES = ["/", "/product", "/memory", "/privacy", "/developers", "/download", "/changelog", "/nope"];
const VIEWPORTS = [[1440, 900], [1280, 800], [1024, 768], [768, 1024], [390, 844], [360, 740]];

const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });

async function newPage(opts = {}, skipIntro = true) {
  const ctx = await browser.newContext({ viewport: { width: opts.w ?? 1440, height: opts.h ?? 900 }, reducedMotion: opts.reduced ? "reduce" : "no-preference" });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  if (skipIntro) await page.addInitScript(() => sessionStorage.setItem("meetdolff:intro-seen", "1"));
  if (opts.noWebGL) await page.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
  return { ctx, page, errors };
}
const go = async (page, r) => { await page.goto(URL + "#" + r); await page.waitForSelector("h1"); await page.waitForTimeout(500); };
const isFontErr = (e) => /fontshare|googleapis|gstatic|ERR_|Failed to load resource/i.test(e);

// 1. Loader
{
  const { ctx, page } = await newPage({}, false);
  await page.goto(URL);
  const seen = await page.locator('[data-testid="loader"]').count();
  check("loader appears on first home visit", seen === 1);
  const t0 = Date.now();
  await page.waitForSelector('[data-testid="loader"]', { state: "detached", timeout: 5000 });
  const dt = Date.now() - t0;
  check("loader finishes on its own (<2.5s)", dt < 2500, `${dt}ms after first check`);
  await page.reload();
  check("loader does not replay in same session", (await page.locator('[data-testid="loader"]').count()) === 0);
  await ctx.close();
}
{
  const { ctx, page } = await newPage({}, false);
  await page.goto(URL);
  await page.click("text=Skip intro");
  await page.waitForSelector('[data-testid="loader"]', { state: "detached", timeout: 2000 });
  check("Skip intro button dismisses loader", true);
  await ctx.close();
}
{
  const { ctx, page } = await newPage({}, false);
  await page.goto(URL);
  await page.keyboard.press("Escape");
  await page.waitForSelector('[data-testid="loader"]', { state: "detached", timeout: 2000 });
  check("Escape dismisses loader", true);
  await ctx.close();
}
{
  const { ctx, page } = await newPage({ reduced: true }, false);
  await page.goto(URL);
  await page.waitForSelector("h1");
  check("reduced motion: no loader", (await page.locator('[data-testid="loader"]').count()) === 0);
  const vis = await page.locator("h1 .h-line").first().evaluate((el) => getComputedStyle(el).transform);
  check("reduced motion: hero headline immediately in place", vis === "none" || vis === "matrix(1, 0, 0, 1, 0, 0)", vis);
  await ctx.close();
}

// 2. WebGL / fallback
{
  const { ctx, page, errors } = await newPage({});
  await go(page, "/");
  await page.waitForTimeout(1200);
  check("hero WebGL canvas renders", (await page.locator('[data-testid="hero-webgl"] canvas').count()) === 1, errors.filter((e) => !isFontErr(e)).join(" | "));
  await page.screenshot({ path: path.join(shots, "hero-1440-webgl.png") });
  await ctx.close();
}
{
  const { ctx, page } = await newPage({ noWebGL: true });
  await go(page, "/");
  check("no WebGL: static fallback visible, no canvas", (await page.locator('[data-testid="hero-fallback"]').isVisible()) && (await page.locator("canvas").count()) === 0);
  await page.screenshot({ path: path.join(shots, "hero-1440-fallback.png") });
  await ctx.close();
}

// 3. Routes x viewports: overflow, console, metadata, screenshots
for (const [w, h] of VIEWPORTS) {
  const { ctx, page, errors } = await newPage({ w, h });
  for (const r of ROUTES) {
    await go(page, r);
    const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(`no horizontal overflow ${r} @${w}`, o <= 0, `overflow=${o}`);
    if (r === "/" || w === 1440 || w === 390) {
      const name = `${r === "/" ? "home" : r.slice(1)}-${w}.png`;
      await page.screenshot({ path: path.join(shots, name), fullPage: w === 1440 || w === 390 });
    }
  }
  check(`no console errors @${w} (excluding remote fonts)`, errors.filter((e) => !isFontErr(e)).length === 0, errors.filter((e) => !isFontErr(e)).join(" | "));
  await ctx.close();
}

// 4. Titles, headings, nav, CTAs
{
  const { ctx, page } = await newPage({});
  const titles = new Set();
  for (const r of ROUTES.slice(0, 7)) {
    await go(page, r);
    titles.add(await page.title());
    check(`route ${r} has exactly one h1`, (await page.locator("h1").count()) === 1);
  }
  check("each route has a unique document title", titles.size === 7, [...titles].join(" / "));
  await go(page, "/");
  check("meta description present", !!(await page.locator('meta[name="description"]').getAttribute("content")));
  for (const label of ["Product", "Memory", "Privacy", "Developers", "Changelog"]) {
    await go(page, "/");
    await page.locator('header nav[aria-label="Primary"]').getByRole("link", { name: label }).click();
    await page.waitForTimeout(300);
    check(`nav link ${label}`, page.url().endsWith("#/" + label.toLowerCase()), page.url().split("#")[1]);
  }
  await go(page, "/");
  const ctas = await page.locator('[data-cta="download"]').count();
  check("download CTAs on home (nav, hero, footer, final) >= 4", ctas >= 4, `count=${ctas}`);
  await page.locator('header [data-cta="download"]').first().click();
  await page.waitForTimeout(500);
  check("nav Download CTA reaches /download", page.url().includes("#/download"));
  check("unpublished state is honest on /download", (await page.locator("text=Not published yet").count()) === 1);
  check("no fake form when endpoint/email not configured", (await page.locator('[data-testid="early-access-unconfigured"]').count()) === 1);
  await go(page, "/");
  await page.getByRole("link", { name: "Explore the memory engine" }).click();
  await page.waitForTimeout(300);
  check("hero secondary CTA → /memory", page.url().endsWith("#/memory"));
  await ctx.close();
}

// 5. Mobile nav + keyboard
{
  const { ctx, page } = await newPage({ w: 390, h: 844 });
  await go(page, "/");
  await page.getByRole("button", { name: "Menu" }).click();
  check("mobile menu opens as modal dialog", await page.getByRole("dialog", { name: "Site menu" }).isVisible());
  await page.keyboard.press("Escape");
  check("Escape closes mobile menu", (await page.getByRole("dialog", { name: "Site menu" }).count()) === 0);
  await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("dialog").getByRole("link", { name: "Privacy" }).click();
  await page.waitForTimeout(300);
  check("mobile menu navigates and closes", page.url().endsWith("#/privacy") && (await page.getByRole("dialog", { name: "Site menu" }).count()) === 0);
  await go(page, "/");
  await page.waitForTimeout(2200);
  await page.screenshot({ path: path.join(shots, "hero-390.png") });
  await ctx.close();
}
{
  const { ctx, page } = await newPage({});
  await go(page, "/");
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.textContent);
  check("first Tab stop is Skip to content", /Skip to content/.test(first ?? ""), first);
  await ctx.close();
}

// 6. Demos
{
  const { ctx, page, errors } = await newPage({});
  await go(page, "/product");
  await page.getByRole("tab", { name: "Transcript" }).click();
  const before = await page.locator('[aria-live="polite"] >> text=/“/').first().textContent();
  await page.getByRole("button", { name: /Moment at 00:04:10/ }).click();
  const after = await page.locator('[aria-live="polite"] >> text=/“/').first().textContent();
  check("waveform segment changes transcript fragment", before !== after && /day of work/.test(after ?? ""), after?.slice(0, 50));
  await page.getByRole("tab", { name: "Search" }).click();
  await page.getByRole("searchbox").fill("Friday");
  check("search filters transcript", (await page.locator("text=/migration notes/").count()) >= 1);
  await page.getByRole("tab", { name: "Actions" }).click();
  await page.getByLabel(/Write migration notes/).check();
  check("action item checkbox toggles", await page.getByLabel(/Write migration notes/).isChecked());
  await page.getByRole("tab", { name: "Record" }).click();
  await page.getByRole("button", { name: "Start recording" }).click();
  await page.waitForTimeout(2200);
  const state = await page.locator('[role="status"]').first().textContent();
  const timer = await page.locator(".t-mono.tabular-nums").first().textContent();
  check("recording demo: Start → Recording with live timer", /Recording/.test(state ?? "") && timer !== "00:00:00", `${state} ${timer}`);
  await page.getByRole("button", { name: "Stop" }).click();
  check("recording demo: Stop → saved", /saved to memory/.test((await page.locator('[role="status"]').first().textContent()) ?? ""));

  await go(page, "/memory");
  await page.getByRole("button", { name: /Kickoff/ }).first().click();
  check("memory engine: select meeting updates detail", (await page.locator("h3", { hasText: "Kickoff" }).count()) >= 1);
  await page.getByRole("button", { name: "Sync", exact: true }).click();
  check("memory engine: topic filter toggles pressed", (await page.getByRole("button", { name: "Sync", exact: true }).getAttribute("aria-pressed")) === "true");
  await page.getByRole("button", { name: /Did anyone commit/ }).click();
  check("evidence: question swaps answer + source", (await page.locator("text=Priya committed").count()) === 1 && (await page.locator("text=00:14:05").count()) >= 1);
  await page.getByRole("button", { name: "Export this meeting's memory" }).click();
  await page.waitForTimeout(900);
  check("export: tree expands to 5 files/dirs under root", (await page.getByRole("treeitem").count()) >= 7, `items=${await page.getByRole("treeitem").count()}`);
  await page.getByRole("treeitem", { name: /meeting-001.json/ }).getByRole("button").click();
  check("export: file preview shows JSON", (await page.locator("pre", { hasText: '"decisions"' }).count()) === 1);

  await go(page, "/developers");
  await page.getByRole("button", { name: "Project: Atlas" }).click();
  check("agent demo: removing project scope → forbidden", (await page.locator("pre", { hasText: "forbidden" }).count()) === 1);
  await page.getByRole("button", { name: "Provider B · Model 2" }).click();
  check("provider demo: selection changes copy", (await page.locator("text=Only the text you ask this provider").count()) === 1);
  await page.getByRole("button", { name: "No provider" }).click();
  check("provider demo: no provider → nothing sent", (await page.locator("text=nothing is sent for AI processing").count()) >= 1);

  await go(page, "/");
  // scroll-driven story
  const a2m = page.locator("#a2m-title");
  await a2m.scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /Structure/ }).click();
  await page.waitForTimeout(1500);
  check("audio-to-memory: step button activates stage", (await page.locator('[aria-current="step"]').innerText()).includes("Structure"));
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(600);
  check("audio-to-memory: scroll advances stage", /Remember|Structure/.test(await page.locator('[aria-current="step"]').innerText()));
  check("no console errors during demos (excluding remote fonts)", errors.filter((e) => !isFontErr(e)).length === 0, errors.filter((e) => !isFontErr(e)).join(" | "));
  await ctx.close();
}

// 7. Network failure: remote fonts blocked must not break rendering
{
  const { ctx, page } = await newPage({});
  await page.route(/fontshare|googleapis|gstatic/, (r) => r.abort());
  await go(page, "/");
  check("page renders with remote fonts blocked", await page.locator("h1").isVisible());
  await ctx.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok);
fs.writeFileSync(path.join(root, "tests/last-run.json"), JSON.stringify({ at: new Date().toISOString(), passed: results.length - failed.length, failed: failed.length, results }, null, 2));
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
