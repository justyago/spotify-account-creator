//
var profileURL = "zhcazdyvux24qheifhmb0g1cn"
// 
require('chromedriver');
const {Builder, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
    chromeOptions.addArguments(`--proxy-server=http://51.158.123.35:9999`)
    //chromeOptions.addArguments("--headless");
    chromeOptions.addArguments("--window-size=150,1020");
    chromeOptions.addArguments("--no-sandbox");

  
var webdriver = require('selenium-webdriver'),
    By = webdriver.By, until = webdriver.until;
    var webdriver = require('selenium-webdriver');


(async function example() {
    const fs = require('fs')


    var data = fs.readFileSync("output.txt"); 
    var dataArr = data.toString('utf8').split('\n');  
    for (let i = 350; i < dataArr.length; i++) {
        var clear = dataArr[i].split(':')
        let driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

        console.log(i)
        await driver.get('https://accounts.spotify.com/en/login/?continue=https:%2F%2Fopen.spotify.com%2Fuser%2F' + profileURL);
        await driver.findElement(By.id('login-username')).sendKeys(clear[0]);
        await driver.findElement(By.id('login-password')).sendKeys(clear[1], Key.RETURN);
        await wait(18000)
        await driver.findElement(By.className("ff6a86a966a265b5a51cf8e30c6c52f4-scss")).click();
        await wait(5000)
        await driver.quit();
    }
})();

async function wait(ms) {
    return new Promise((resolve) => setTimeout(() => {
        resolve(ms);
    }, ms))
}
