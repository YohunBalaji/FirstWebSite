const puppeteer = require("puppeteer-core");

async function checkErrors() {
  const browser = await puppeteer.connect({ browserURL: "http://localhost:9222" });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", err => errors.push(err.message));
  page.on("console", msg => console.log("LOG:", msg.text()));

  await page.goto("file:///C:/Users/B2877225/.gemini/antigravity/scratch/portfolio/index.html", { waitUntil: "networkidle2" });

  console.log("Page errors:", errors);
  await page.close();
  await browser.disconnect();
}
checkErrors().catch(console.error);
