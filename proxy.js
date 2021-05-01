//
var profileURL = "zhcazdyvux24qheifhmb0g1cn"
// 
require('chromedriver');
const {Builder, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
    chromeOptions.addArguments(`--proxy-server=http://45.153.33.166:3128`)
    //chromeOptions.addArguments("--headless");
    chromeOptions.addArguments("--window-size=150,1020");
    chromeOptions.addArguments("--no-sandbox");

  
var webdriver = require('selenium-webdriver'),
    By = webdriver.By, until = webdriver.until;
    var webdriver = require('selenium-webdriver');


(async function example() {
    const fs = require('fs')
    var data = fs.readFileSync("pro.txt"); 
    var dataArr = data.toString('utf8').split('\n');  
    for (let i = 0; i < dataArr.length; i++) {
        var clear = dataArr[i].split('-')
        console.log(clear[6])
    }
})();

async function wait(ms) {
    return new Promise((resolve) => setTimeout(() => {
        resolve(ms);
    }, ms))
}
