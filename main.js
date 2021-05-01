const request = require('request');
const randomName = require('node-random-name');
const fs = require('fs');
const fetch = require('node-fetch');

const getRandomString = async (length) => {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}



const start = async () => {
    var nick = randomName({
        first: true,
        gender: 'male'
    });
    var password = await getRandomString(16);
    var email = (await getRandomString(5)).toLowerCase() + nick.toLowerCase() + '@icloud.com';

    var form = {"creation_point": "client_mobile","gender": "male","birth_year": 1992,"displayname": nick,"iagree": "true","birth_month": 4,"password_repeat": password,"password": password,"key": "142b583129b2df829de3656f9eb484e6","platform": "Android-ARM","email": email,"birth_day": 18}
    var headers = {
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
    console.log(`Creating ${email}:${password}`);
    var proxy = await fetch('http://pubproxy.com/api/proxy?limit=1&format=txt&type=https')
        .then(res => res.text())
        .then(data => { return (`http://51.223.245.89:8080`) });
        console.log(`[PROXY] ${proxy}`);
    request.post({
        headers,
        url: 'https://spclient.wg.spotify.com/signup/public/v1/account/',
        proxy,
        form
    }, (err, res, body) => {

        if (err) {
            //console.log(`[FAIL] ${email}|${password} [${nick}]`);
            console.log(`[ERROR] ${err}`);
            return;
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`[SUCCESS] ${email}|${password} [${nick}]`);
            fs.appendFile('output.txt', `${email}:${password}:${nick}\n`, err => {
                if (err) console.log('Error when appending output file!');
            });
        } else {
            console.log(`[FAIL] ${email}|${password} [${nick}]`);
        }
    });
};
setInterval(() => {
    start();
}, 10000);
