const puppeteer = require("puppeteer-core");
const path = require("path");

async function testLocal() {
  const browser = await puppeteer.connect({ browserURL: "http://localhost:9222" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  const localFile = "file:///C:/Users/B2877225/.gemini/antigravity/scratch/portfolio/index.html";
  console.log("Loading local file:", localFile);
  await page.goto(localFile, { waitUntil: "networkidle2" });

  const n1 = await page.$eval("#mathNum1", el => parseInt(el.textContent.trim(), 10));
  const n2 = await page.$eval("#mathNum2", el => parseInt(el.textContent.trim(), 10));
  const ans = n1 + n2;
  console.log(`Local question: ${n1} + ${n2} = ${ans}`);

  await page.focus("#captchaInput");
  await page.type("#captchaInput", ans.toString());
  console.log("Typed answer:", ans);

  await page.click("#captchaVerifyBtn");
  await new Promise(r => setTimeout(r, 600));

  const isRevealed = await page.$eval("#emailRevealed", el => window.getComputedStyle(el).display !== "none");
  const emailHtml = await page.$eval("#revealedEmailContainer", el => el.innerHTML);
  console.log("Is revealed:", isRevealed);
  console.log("Email container HTML:", emailHtml);

  await page.close();
  await browser.disconnect();
}
testLocal().catch(console.error);
