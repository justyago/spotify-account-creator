const fs = require('fs')
const data = fs.readFileSync("output.txt").toString();
const splitData = data.split('<a href="')[1].split('">')[0]
console.log(data.length)
console.log(splitData[0])

const jsonData = splitData.split('\n').map((e) => { return {url: e}})

console.log(jsonData)

console.log("https://alfa.netstream.fun/customers/"+jsonData)