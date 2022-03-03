const client = require('./client')
const fs = require('fs');
const logger = require("elogger");

const file = {name:'def.txt'}
client.deleteFile(file, (error, res) => {
    console.log(res)
    if (!error) {
        console.log('File deleted successfully:', file.name)
    } else {
        console.error(error)
    }
})
