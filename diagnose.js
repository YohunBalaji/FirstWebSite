const puppeteer = require("puppeteer-core");

async function diagnose() {
  const browser = await puppeteer.connect({ browserURL: "http://localhost:9222" });
  const page = await browser.newPage();
  page.on("console", msg => console.log("BROWSER CONSOLE:", msg.text()));

  await page.goto("file:///C:/Users/B2877225/.gemini/antigravity/scratch/portfolio/index.html", { waitUntil: "networkidle2" });

  const stateBefore = await page.evaluate(() => {
    return {
      n1: document.getElementById("mathNum1")?.textContent,
      n2: document.getElementById("mathNum2")?.textContent,
      inputVal: document.getElementById("captchaInput")?.value,
      hasListener: typeof window.verifyCaptcha
    };
  });
  console.log("State before:", stateBefore);

  // Type answer
  await page.type("#captchaInput", (parseInt(stateBefore.n1) + parseInt(stateBefore.n2)).toString());

  const stateAfterType = await page.evaluate(() => {
    return {
      inputVal: document.getElementById("captchaInput")?.value,
      buttonTagName: document.getElementById("captchaVerifyBtn")?.tagName,
      buttonType: document.getElementById("captchaVerifyBtn")?.type
    };
  });
  console.log("State after type:", stateAfterType);

  // Click
  await page.click("#captchaVerifyBtn");
  await new Promise(r => setTimeout(r, 500));

  const stateAfterClick = await page.evaluate(() => {
    return {
      captchaChallengeDisplay: window.getComputedStyle(document.getElementById("captchaChallenge")).display,
      emailRevealedDisplay: window.getComputedStyle(document.getElementById("emailRevealed")).display,
      errorText: document.getElementById("captchaError")?.textContent,
      errorDisplay: window.getComputedStyle(document.getElementById("captchaError")).display
    };
  });
  console.log("State after click:", stateAfterClick);

  await page.close();
  await browser.disconnect();
}
diagnose().catch(console.error);
