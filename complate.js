var profileID = "21zgqwuyjq4mnqpxj7ccbijuq"
const request = require('request');
const random_name = require('node-random-name');
var nick = random_name({ first: true, gender: "male" })
var passwords = getRandomString(16)
var email = getRandomString(5) + nick + "@icloud.com"
require('chromedriver');
const config = require('./config.json');
const fs = require('fs')
const {Builder, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--headless");
    chromeOptions.addArguments("--no-sandbox");

  
var webdriver = require('selenium-webdriver'),
    By = webdriver.By, until = webdriver.until;
    var webdriver = require('selenium-webdriver');

var USERS = []

//console.log("Total Account: "+ config.spotify_accounts.length)

var sendingReq = {"creation_point": "client_mobile","gender": "male","birth_year": 1992,"displayname": nick,"iagree": "true","birth_month": 4,"password_repeat": passwords,"password": passwords,"key": "142b583129b2df829de3656f9eb484e6","platform": "Android-ARM","email": email,"birth_day": 18}
var headValue = {
    "Accept-Encoding": "gzip",
    "Accept-Language": "en-US",
    "Connection": "Keep-Alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "spclient.wg.spotify.com",
    "User-Agent": "Spotify/8.6.16 Android/22 (SM-N976N)",
    "Spotify-App-Version": "8.6.16",
    "App-Platform": "Android",
    "X-Client-Id": getRandomString(32)
}

function getRandomString(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

const generateEmail = async () => {
    var nick = await random_name({ first: true, gender: "male" })
    var password = await getRandomString(16)
    var email = await getRandomString(5) + nick + "@icloud.com"
    return { email, password }
}

function start() {
    console.log("started")
    request.post({
        headers: headValue,
        url: 'https://spclient.wg.spotify.com/signup/public/v1/account/',
        form: sendingReq
    }, function(error, response, body){
        (async function example() {
            var { email, password } = await generateEmail()
            console.log(`Email:${email}, password:${password}`)
            await wait(2000)
            let driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
            await driver.get('https://accounts.spotify.com/en/login/?continue=https://open.spotify.com/user/'+profileID);
            await driver.findElement(By.id('login-username')).sendKeys(email);
            await driver.findElement(By.id('login-password')).sendKeys(passwords, Key.RETURN);
            await wait(5000)
            await driver.findElement(By.className("ff6a86a966a265b5a51cf8e30c6c52f4-scss")).click();
            USERS.push({ email, password })
        })();
        fs.writeFile('users.json', JSON.stringify(USERS), (err) => {
            if(err) console.log('ERROR: ', err)
            console.log('')
        })
    });
}

async function wait(ms) {
    return new Promise((resolve) => setTimeout(() => {
        resolve(ms);
    }, ms))
}

(async () => {
    for (let i = 1; i < 10000; i++) {
        await wait(10000)
        start()
    }
})();