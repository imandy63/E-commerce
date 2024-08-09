// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var product_pb = require('./product_pb.js');

function serialize_GetProductByIdRequest(arg) {
  if (!(arg instanceof product_pb.GetProductByIdRequest)) {
    throw new Error('Expected argument of type GetProductByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetProductByIdRequest(buffer_arg) {
  return product_pb.GetProductByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetProductByIdResponse(arg) {
  if (!(arg instanceof product_pb.GetProductByIdResponse)) {
    throw new Error('Expected argument of type GetProductByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetProductByIdResponse(buffer_arg) {
  return product_pb.GetProductByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProductServiceService = exports.ProductServiceService = {
  getProductById: {
    path: '/ProductService/GetProductById',
    requestStream: false,
    responseStream: false,
    requestType: product_pb.GetProductByIdRequest,
    responseType: product_pb.GetProductByIdResponse,
    requestSerialize: serialize_GetProductByIdRequest,
    requestDeserialize: deserialize_GetProductByIdRequest,
    responseSerialize: serialize_GetProductByIdResponse,
    responseDeserialize: deserialize_GetProductByIdResponse,
  },
};

exports.ProductServiceClient = grpc.makeGenericClientConstructor(ProductServiceService);
