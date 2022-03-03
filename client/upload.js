const client = require('./client')
const fs = require('fs');
const logger = require("elogger");

// let newNote = {
//     title: "New Note",
//     content: "New Note content"
// }

// client.insert(newNote, (error, note) => {
//     if (!error) {
//         console.log('New Note created successfully', note)
//     } else {
//         console.error(error)
//     }
// })


const serviceCall = client.uploadFile((err, response) => {
    if(err) {
        logger.error(err);
    }
    else {
        console.log(response);
    }
});

serviceCall.write({
    name: 'abc.txt'
});

const readStream = fs.createReadStream('./clientFiles/abc.txt');

readStream.on('data', (chunk) => {
    console.log(chunk)
    serviceCall.write({
        chunk: Uint8Array.from(chunk)
    });
});

readStream.on('end', () => {
    serviceCall.end();
});