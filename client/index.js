// const grpc = require('@grpc/grpc-js');
// const protoLoader = require('@grpc/proto-loader');

// const PROTO_PATH = __dirname + '/protos/users.proto';
// const server = {
//   host: 'localhost',
//   port: '50051'
// };

// const packageDefinition = protoLoader.loadSync("././file_operations.proto", {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true
//   });
// const fileUploaderProto = grpc.loadPackageDefinition(packageDefinition).FileUploaderPackage;

// // const usersProto = grpc
// //   .loadPackageDefinition(packageDefinition).FileUploaderPackage;

// const main = () => {
//   const { host, port } = server;
//   console.log('hi')

// //   const client = new usersProto.Users(
// //     `${host}:${port}`,
// //     grpc.credentials.createInsecure());

// //   client.getUser(
// //     { id: '<user_id>' }, 
// //     (err, response) => {
// //        console.log(err || response);
// //     });
// };


// main();