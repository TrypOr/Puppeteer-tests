const puppeteer = require('puppeteer');
const fs = require('fs');
const urls = ['https://www.csd.uoc.gr/','http://math.uoc.gr/el/'
,'https://www.physics.uoc.gr/','https://www.chemistry.uoc.gr/'];// array of urls
(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    await page.goto(`${url}`,{ waitUntil: 'networkidle2' });
    // Get all the page's cookies and save them to the cookies variable
    const cookies = await page.cookies();
    fs.appendFileSync('cookies.json', JSON.stringify(cookies)+'\n', function (err) {
      if (err) throw err;
      });
}
  await browser.close();
})();