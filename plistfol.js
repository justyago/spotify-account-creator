//
var profileURL = "21zgqwuyjq4mnqpxj7ccbijuq"
// 
require('chromedriver');
const {Builder, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
    chromeOptions.addArguments(`--proxy-server=http://45.153.33.166:3128`)
    //chromeOptions.addArguments("--headless");
    chromeOptions.addArguments("--disable-images");
    chromeOptions.addArguments("--window-size=150,1736");
    chromeOptions.addArguments("--disable-popup-blocking");
    chromeOptions.addArguments("--no-sandbox");

  
var webdriver = require('selenium-webdriver'),
    By = webdriver.By, until = webdriver.until;
    var webdriver = require('selenium-webdriver');


(async function example() {
    const fs = require('fs')


    var data = fs.readFileSync("output.txt"); 
    var dataArr = data.toString('utf8').split('\n');  
    for (let i = 158; i < dataArr.length; i++) {
        var clear = dataArr[i].split(':')
        let driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

        console.log(i)
        await driver.get('https://accounts.spotify.com/en/login/?continue=https://open.spotify.com/playlist/58TIloGIeQQ7CW7mgSgBzM');
        await driver.findElement(By.id('login-username')).sendKeys(clear[0]);
        await driver.findElement(By.id('login-password')).sendKeys(clear[1], Key.RETURN);
        await wait(20000)
        await driver.findElement(By.className("_07bed3a434fa59aa1852a431bf2e19cb-scss")).click();
        await wait(3000)
        await driver.quit();
    }
})();

async function wait(ms) {
    return new Promise((resolve) => setTimeout(() => {
        resolve(ms);
    }, ms))
}
