const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

async function runLiveBrowserTest() {
  console.log("1. Launching Microsoft Edge browser in automation mode...");
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: "new",
    defaultViewport: { width: 1280, height: 900 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  
  // Track console logs from page
  page.on("console", msg => console.log("  [Browser Console]:", msg.text()));

  console.log("2. Navigating to live URL: https://yohunbalaji.github.io/FirstWebSite/?test=" + Date.now());
  await page.goto("https://yohunbalaji.github.io/FirstWebSite/?test=" + Date.now(), { waitUntil: "networkidle2" });

  const brainDir = "C:\\Users\\B2877225\\.gemini\\antigravity\\brain\\eee96a07-d7eb-4647-8a6b-b6b821932fb3";

  console.log("3. Scrolling to Contact & CAPTCHA section...");
  await page.evaluate(() => {
    document.getElementById("contact").scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Screenshot Step 1: Challenge
  const captchaBox = await page.$("#captchaBox");
  const step1Path = path.join(brainDir, "test_step1_captcha.png");
  await captchaBox.screenshot({ path: step1Path });
  console.log("   Saved screenshot: test_step1_captcha.png");

  // Read the numbers
  const n1 = await page.$eval("#mathNum1", el => parseInt(el.textContent.trim(), 10));
  const n2 = await page.$eval("#mathNum2", el => parseInt(el.textContent.trim(), 10));
  const expectedAnswer = n1 + n2;
  console.log(`4. Read CAPTCHA question: ${n1} + ${n2} = ${expectedAnswer}`);

  console.log(`5. Typing answer "${expectedAnswer}" into captcha input...`);
  await page.type("#captchaInput", expectedAnswer.toString());

  console.log("6. Clicking 'Verify & Reveal Email' button...");
  await page.click("#captchaVerifyBtn");
  await new Promise(r => setTimeout(r, 800));

  // Verify reveal
  const isRevealed = await page.$eval("#emailRevealed", el => window.getComputedStyle(el).display !== "none");
  const revealedText = await page.$eval("#revealedEmailContainer", el => el.textContent.trim());
  console.log("7. Verification result:");
  console.log("   - Is emailRevealed visible?:", isRevealed);
  console.log("   - Revealed email text in DOM:", revealedText);

  // Screenshot Step 2: Revealed Email
  const step2Path = path.join(brainDir, "test_step2_revealed.png");
  await captchaBox.screenshot({ path: step2Path });
  console.log("   Saved screenshot: test_step2_revealed.png");

  // Screenshot Step 3: Visitor Counter in Footer
  console.log("8. Scrolling to Footer to capture Visitor Counter...");
  await page.evaluate(() => {
    document.querySelector("footer").scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));

  const footer = await page.$("footer");
  const step3Path = path.join(brainDir, "test_step3_visitor_counter.png");
  await footer.screenshot({ path: step3Path });
  console.log("   Saved screenshot: test_step3_visitor_counter.png");

  await browser.close();
  console.log("\n=== BROWSER AUTOMATION TEST COMPLETE ===");
}

runLiveBrowserTest().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
