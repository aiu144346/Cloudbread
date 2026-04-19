const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  console.log("--- CONSOLE LOGS ---");
  page.on('console', msg => console.log(`[${msg.type()}] ${msg.text()}`));
  
  console.log("--- PAGE ERRORS ---");
  page.on('pageerror', error => console.log(`[pageerror] ${error.message}`));
  
  console.log("--- REQUEST FAILURES ---");
  page.on('requestfailed', request => {
      console.log(`[failed] ${request.url()} - ${request.failure().errorText}`);
  });

  try {
      await page.goto('https://cloudbread.me/archive.html', { waitUntil: 'networkidle0' });
      console.log("\nNavigation complete. Taking a screenshot for verification.");
      await page.screenshot({ path: 'live_archive_screenshot.png' });
      
      // Dump the src of the first few images to see their generated URLs
      const imageSrcs = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('img.lecture-thumb')).map(img => img.src).slice(0, 5);
      });
      console.log("\n--- GENERATED IMAGE URLs ---");
      console.log(imageSrcs);

  } catch (e) {
      console.error("Puppeteer Script Error:", e);
  } finally {
      await browser.close();
  }
})();
