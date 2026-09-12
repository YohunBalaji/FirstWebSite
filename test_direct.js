const puppeteer = require("puppeteer-core");

async function testDirect() {
  const browser = await puppeteer.connect({ browserURL: "http://localhost:9222" });
  const page = await browser.newPage();
  page.on("console", msg => console.log("PAGE LOG:", msg.text()));

  await page.goto("file:///C:/Users/B2877225/.gemini/antigravity/scratch/portfolio/index.html", { waitUntil: "networkidle2" });

  const res = await page.evaluate(() => {
    const n1 = parseInt(document.getElementById("mathNum1").textContent);
    const n2 = parseInt(document.getElementById("mathNum2").textContent);
    document.getElementById("captchaInput").value = (n1 + n2).toString();
    
    const btn = document.getElementById("captchaVerifyBtn");
    console.log("About to click button, btn found:", !!btn);
    btn.click();
    
    return {
      n1, n2,
      input: document.getElementById("captchaInput").value,
      emailRevealedDisplay: window.getComputedStyle(document.getElementById("emailRevealed")).display,
      revealedHtml: document.getElementById("revealedEmailContainer").innerHTML
    };
  });
  console.log("Direct dispatch result:", res);
  await page.close();
  await browser.disconnect();
}
testDirect().catch(console.error);
