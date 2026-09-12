const puppeteer = require("puppeteer-core");

async function debug() {
  const browser = await puppeteer.connect({ browserURL: "http://localhost:9222" });
  const page = await browser.newPage();
  page.on("console", msg => console.log("PAGE CONSOLE:", msg.type(), msg.text()));
  page.on("pageerror", err => console.log("PAGE ERROR:", err.message));

  await page.goto("https://yohunbalaji.github.io/FirstWebSite/?t=" + Date.now(), { waitUntil: "networkidle2" });

  const n1 = await page.$eval("#mathNum1", el => parseInt(el.textContent.trim(), 10));
  const n2 = await page.$eval("#mathNum2", el => parseInt(el.textContent.trim(), 10));
  console.log(`Question: ${n1} + ${n2}`);

  // Test triggering the verify directly in page context
  const evalResult = await page.evaluate((ans) => {
    const input = document.getElementById("captchaInput");
    input.value = ans;
    const btn = document.getElementById("captchaVerifyBtn");
    console.log("Button in page:", !!btn);
    btn.click();
    const revealed = document.getElementById("emailRevealed");
    return {
      revealedDisplay: window.getComputedStyle(revealed).display,
      errorText: document.getElementById("captchaError").textContent,
      containerHtml: document.getElementById("revealedEmailContainer").innerHTML
    };
  }, n1 + n2);

  console.log("Eval result:", evalResult);
  await page.close();
  await browser.disconnect();
}
debug().catch(console.error);
