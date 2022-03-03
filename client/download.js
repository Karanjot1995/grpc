const client = require('./client')
const fs = require('fs');
const logger = require("elogger");


client.downloadFile({name: 'def.txt'}, (error, res) => {
    console.log(res)
    if (!error) {
        fs.writeFileSync(`./clientFiles/downloads/${res.name}`, res.chunk)
        console.log('File downloaded Successfully: ',res.name)
    } else {
        console.error(error)
    }
});