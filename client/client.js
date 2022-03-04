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