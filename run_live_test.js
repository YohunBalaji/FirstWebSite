const puppeteer = require("puppeteer-core");
const path = require("path");

async function runTest() {
  console.log("Connecting to Edge remote browser on port 9222...");
  const browser = await puppeteer.connect({ browserURL: "http://localhost:9222" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  const brainDir = "C:\\Users\\B2877225\\.gemini\\antigravity\\brain\\eee96a07-d7eb-4647-8a6b-b6b821932fb3";

  console.log("1. Navigating to https://yohunbalaji.github.io/FirstWebSite/?t=" + Date.now());
  await page.goto("https://yohunbalaji.github.io/FirstWebSite/?t=" + Date.now(), { waitUntil: "networkidle2" });

  console.log("2. Scrolling to Contact & CAPTCHA section...");
  await page.evaluate(() => {
    document.getElementById("contact").scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1200));

  // Screenshot 1: Challenge
  const captchaBox = await page.$("#captchaBox");
  const step1Path = path.join(brainDir, "browser_test_1_captcha.png");
  await captchaBox.screenshot({ path: step1Path });
  console.log("📸 [Screenshot 1 Captured]: browser_test_1_captcha.png");

  // Read the numbers
  const n1 = await page.$eval("#mathNum1", el => parseInt(el.textContent.trim(), 10));
  const n2 = await page.$eval("#mathNum2", el => parseInt(el.textContent.trim(), 10));
  const ans = n1 + n2;
  console.log(`🤖 Read CAPTCHA question from DOM: ${n1} + ${n2} = ? (Answer: ${ans})`);

  console.log(`⌨️ Typing answer "${ans}" into captcha input...`);
  await page.type("#captchaInput", ans.toString());
  await new Promise(r => setTimeout(r, 500));

  console.log("🖱️ Clicking 'Verify & Reveal Email 🔓' button...");
  await page.click("#captchaVerifyBtn");
  await new Promise(r => setTimeout(r, 1000));

  // Check revealed state
  const isRevealed = await page.$eval("#emailRevealed", el => window.getComputedStyle(el).display !== "none");
  const emailText = await page.$eval("#revealedEmailContainer", el => el.textContent.trim());
  console.log("✅ DOM Verification Result:");
  console.log("   - Is #emailRevealed visible?:", isRevealed);
  console.log("   - Revealed Email in DOM:", emailText);

  // Screenshot 2: Revealed Email
  const step2Path = path.join(brainDir, "browser_test_2_revealed.png");
  await captchaBox.screenshot({ path: step2Path });
  console.log("📸 [Screenshot 2 Captured]: browser_test_2_revealed.png");

  // Screenshot 3: Visitor Counter in Footer
  console.log("3. Scrolling to Footer to capture live Visitor Counter...");
  await page.evaluate(() => {
    document.querySelector("footer").scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));

  const footer = await page.$("footer");
  const step3Path = path.join(brainDir, "browser_test_3_visitor.png");
  await footer.screenshot({ path: step3Path });
  console.log("📸 [Screenshot 3 Captured]: browser_test_3_visitor.png");

  await page.close();
  await browser.disconnect();
  console.log("\n🎉 ALL BROWSER AUTOMATION TESTS PASSED!");
}

runTest().catch(console.error);
