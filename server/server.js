const logger = require("elogger");
const uuid = require('uuid');
const fs = require("fs");
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const syncDirectory = require('sync-directory');
var path = require("path");
var fse = require('fs-extra')


const packageDefinition = protoLoader.loadSync("././file_operations.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const fileUploaderProto = grpc.loadPackageDefinition(packageDefinition).FileUploaderPackage;



// define file upload method
const uploadFile = (call, callback) => {
  logger.debug(`gRPC ${call.call.handler.path}`);
  
  let name, chunk;
  let serverFilePath = `./server/serverFiles/uploads/`;
  
  call.on('data', async (payload) => {
      if(payload.data && payload.data=='name' && payload[payload.data]) {
          name = payload[payload.data];
          console.log(name)
          serverFilePath+=name
        //   console.log(serverFilePath+name)
      }
      else if(payload.data && payload.data=='chunk' && payload[payload.data]) {
          chunk = payload[payload.data];
          fs.appendFileSync(serverFilePath, chunk);
          logger.debug(`Writing file chunk: ${serverFilePath}`);
      }
  });
  call.on('end', async () => {
      callback(null, {
          'id': uuid.v4(),
          'name': name
      });
  });
};


const downloadFile = (call, callback) => {
    logger.debug(`gRPC ${call.call.handler.path}`);
    console.log(call.request)
    let serverFilePAth = `server/serverFiles/${call.request.name}`
    const readStream = fs.createReadStream(serverFilePAth);

    readStream.on('data',function(chunk){
        callback(null, {name:call.request.name,chunk: Uint8Array.from(chunk)})
    })
    readStream.on('end',function(){
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        })
    })
};


const renameFile = (call, callback) => {
    console.log(call.request)
    logger.debug(`gRPC ${call.call.handler.path}`);
    let serverFilePath = `server/serverFiles/${call.request.name}`
    let newServerFilePath = `server/serverFiles/${call.request.newName}`

    console.log(serverFilePath,newServerFilePath)

    // console.log(path)
    const readStream = fs.createReadStream(serverFilePath);
    fs.rename(serverFilePath, newServerFilePath, function(err,res) {
        if ( err ) console.log('ERROR: ' + err)
    });
    // fs.rename(serverFilePath,newServerFilePath,callback)

    readStream.on('data',function(){
        callback(null, {name:call.request.newName})
    })
    readStream.on('end',function(){
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        })
    })
};


const deleteFile = (call, callback) => {
    console.log(call.request)
    logger.debug(`gRPC ${call.call.handler.path}`);
    let serverFilePath = `server/serverFiles/${call.request.name}`

    const readStream = fs.createReadStream(serverFilePath);

    fs.unlinkSync(serverFilePath, (err) => {
        if (err) {
            console.error(err)
        }
    })

    readStream.on('data',function(){
        callback(null, {name:call.request.name})
    })
    readStream.on('end',function(){
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        })
    })


}



const syncFolder = async (call, callback) => {
    let folderPath = path.resolve("./server/syncFolder");

    console.log(call.request.path)
    logger.debug(`gRPC ${call.call.handler.path}`);
    // let serverFilePath = `server/syncFolder`
    fse.copySync(call.request.path, folderPath)
    // await syncDirectory.sync(call.request.path, folderPath, (err,res)=>{
    //     if(err){
    //         console.log(err)
    //     }
    // }
    // );

    callback(null, {path})
}



// initialize server and register handlers for the respective RPC methods
const server = new grpc.Server();        
server.addService(fileUploaderProto.FileService.service, {
  uploadFile: uploadFile,
  downloadFile: downloadFile,
  renameFile: renameFile,
  deleteFile: deleteFile,
  syncFolder: syncFolder
});


// bind & start the server process to port: 9090
const bindEndpoint = `0.0.0.0:9090`;
server.bindAsync(bindEndpoint, grpc.ServerCredentials.createInsecure(), (err, response) => {
  if(err) {
      logger.error(err);
  }
  else {
      server.start();
      logger.info(`File uploader gRPC service started on grpc://${bindEndpoint}`);
      
  }
});



