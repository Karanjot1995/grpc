const client = require('./client')
const fs = require('fs');
const logger = require("elogger");
var path = require("path");
let folderPath = path.resolve("./syncFolder");

client.syncFolder({path:folderPath}, (error, res) => {
    console.log(res)
    if (!error) {
        console.log('syncFolder in client and server synced successfully')
    } else {
        console.error(error)
    }
})