const puppeteer = require("puppeteer");
(async () => {
    
        const browser = await puppeteer.launch({args: ['--no-sandbox']});
const page = await browser.newPage();
await page.goto("https://pancakebunny.finance/pool", {
          waitUntil: "networkidle2",
        });
        await page
          .waitForXPath(
            "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[1]/div/div[3]/div/div/div/span"
          )
          .then(() => console.log("waited for Rewards value"));
 await page.screenshot({ path: "example.png" });
    
              await browser.close();
   
        
  })();
