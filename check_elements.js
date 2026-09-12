const puppeteer = require("puppeteer-core");

async function checkElements() {
  const browser = await puppeteer.connect({ browserURL: "http://localhost:9222" });
  const page = await browser.newPage();
  await page.goto("https://yohunbalaji.github.io/FirstWebSite/?t=" + Date.now(), { waitUntil: "networkidle2" });

  const info = await page.evaluate(() => {
    const inputs = document.querySelectorAll("#captchaInput");
    const script = document.getElementById("script");
    return {
      inputsCount: inputs.length,
      inputValueDirect: document.querySelector("#captchaInput").value,
      inputValueType: typeof document.querySelector("#captchaInput").value,
      inputOuterHTML: document.querySelector("#captchaInput").outerHTML
    };
  });
  console.log("Input info:", info);
  await page.close();
  await browser.disconnect();
}
checkElements().catch(console.error);
