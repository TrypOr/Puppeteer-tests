const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36');
  await page.goto("https://www.bestprice.gr/cat/806/mobile-phones.html" );
  await page.waitForTimeout(1000);
  await page.screenshot({path:"best_price_page1.png",fullPage: true})
  let isBtnDisabled = false;
  fs.appendFileSync("results.csv",`Title,Price,Release date,\n`,(err) => {if (err) {console.log(err);}});
  while(!isBtnDisabled){
     let prevurl = page.url();
      await Promise.all([
        page.click("li.pagination-action.pagination-action-next > a"),
        await page.waitForSelector("li.pagination-action.pagination-action-next", { visible: true }),
        await page.waitForNavigation({
          waitUntil: 'networkidle2',
        }),
      ]);
        if(prevurl != page.url()){
          console.log(page.url());
          const titles = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("div.p__main > div > h3")).map(x=>x.textContent)
           });
           const price = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("div.p__footer > div.p__price-merchants > a > div")).map(x=>x.textContent)
           });
           const release_date = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("div.p__main > div.p__meta > div")).map(x=>x.textContent)
           });
            for(const title in titles){
              if(titles[title]==null){
                titles[title]="-";
              }
              if(price[title]==null){
                price[title]="-";
              }
              if(release_date[title]==null){
                release_date[title]="-";
              }else{
                release_date[title]=release_date[title].slice(0,4);
              }
                fs.appendFileSync(
                  "results.csv",`${titles[title]},${price[title].replace(/,/g, ".")},${release_date[title]},\n`,
                  (err) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
                }
        }
    
  }
  await browser.close();
})();

