const client = require('./client')
const fs = require('fs');
const logger = require("elogger");

client.renameFile({name:'ghi.txt', newName:'def.txt'}, (error, res) => {
    console.log(res)
    if (!error) {
        console.log('File renamed successfully', res.name)
    } else {
        console.error(error)
    }
})