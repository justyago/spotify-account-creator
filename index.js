const request = require('request');
const random_name = require('node-random-name');
var nick = random_name({ first: true, gender: "male" })
var passwords = getRandomString(16)
var email = getRandomString(5) + nick + "@icloud.com"

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

function start() {
    console.log("started")
    request.post({
        headers: headValue,
        url: 'https://spclient.wg.spotify.com/signup/public/v1/account/',
        form: sendingReq
    }, function(error, response, body){

        if(response.status === 200) {
            console.log("username: " + nick)
            console.log("Password: " +passwords)
            console.log("Mail: " +email)
        }
    });
}

start()