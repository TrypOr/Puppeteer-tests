# Puppeteer-tests
Some simple puppeteer/javascript programms index.js and cookies.js

index.js : Enters page : https://www.bestprice.gr/cat/806/mobile-phones.html by using a UserAgent (If there is no user agent access is denied)
Then parses the page storing phone tile,price and release page , after its done with the first page it clicks the next button to move to the next page and store data.
It does this until no more pages are available.

cookies.js: Takes an array of urls and stores each urls cookies in a json file
