const puppeteer = require("puppeteer-core");
const os = require("os");
const path = require("path");

async function test() {
  const tmpDir = path.join(os.tmpdir(), "edge_test_prof_" + Date.now());
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    args: [
      `--user-data-dir=${tmpDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-gpu",
      "--disable-extensions"
    ]
  });
  console.log("Edge launched successfully!");
  const page = await browser.newPage();
  await page.goto("https://yohunbalaji.github.io/FirstWebSite/", { waitUntil: "domcontentloaded" });
  console.log("Page title:", await page.title());
  await browser.close();
}
test().catch(console.error);
