const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('../file_operations.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const endpoint = 'localhost:9090';
const fileUploaderProto = grpc.loadPackageDefinition(packageDefinition).FileUploaderPackage;

const client = new fileUploaderProto.FileService(endpoint, grpc.credentials.createInsecure());

module.exports = client;



// const PROTO_PATH = './notes.proto';
// const grpc = require('@grpc/grpc-js');
// var protoLoader = require('@grpc/proto-loader');

// const packageDefinition = protoLoader.loadSync('../notes.proto', {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true
//   })
// const notesProtoPackage = grpc.loadPackageDefinition(packageDefinition).Notes;
// // const notesProto = protoLoader.loadSync('notes.proto', {
// //     keepCase: true,
// //     longs: String,
// //     enums: String,
// //     defaults: true,
// //     oneofs: true
// //   })
// // const NoteService = grpc.load(PROTO_PATH).NoteService
// const NoteService = notesProtoPackage.NoteService

// const client = new NoteService('localhost:50051',
//     grpc.credentials.createInsecure());

// module.exports = client


