const client = require('./client')
const fs = require('fs');
const logger = require("elogger");

client.renameFile({name:'def.txt', newName:'ghi.txt'}, (error, res) => {
    console.log(res)
    if (!error) {
        console.log('File renamed successfully', res.name)
    } else {
        console.error(error)
    }
})