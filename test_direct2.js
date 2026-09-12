const puppeteer = require("puppeteer-core");

async function testDirect() {
  const browser = await puppeteer.connect({ browserURL: "http://localhost:9222" });
  const page = await browser.newPage();
  page.on("console", msg => console.log("PAGE LOG:", msg.text()));

  await page.goto("file:///C:/Users/B2877225/.gemini/antigravity/scratch/portfolio/index.html", { waitUntil: "networkidle2" });

  const n1 = await page.$eval("#mathNum1", el => parseInt(el.textContent));
  const n2 = await page.$eval("#mathNum2", el => parseInt(el.textContent));
  console.log(`Question: ${n1} + ${n2} = ${n1 + n2}`);

  await page.type("#captchaInput", (n1 + n2).toString());
  await page.click("#captchaVerifyBtn");
  
  // Wait 300ms
  await new Promise(r => setTimeout(r, 300));

  const res = await page.evaluate(() => {
    return {
      challengeDisplay: window.getComputedStyle(document.getElementById("captchaChallenge")).display,
      revealedDisplay: window.getComputedStyle(document.getElementById("emailRevealed")).display,
      emailHtml: document.getElementById("revealedEmailContainer").innerHTML
    };
  });
  console.log("Result after 300ms:", res);
  await page.close();
  await browser.disconnect();
}
testDirect().catch(console.error);
