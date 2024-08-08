// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var inventory_pb = require('./inventory_pb.js');

function serialize_AddInventoryRequest(arg) {
  if (!(arg instanceof inventory_pb.AddInventoryRequest)) {
    throw new Error('Expected argument of type AddInventoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddInventoryRequest(buffer_arg) {
  return inventory_pb.AddInventoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AddInventoryResponse(arg) {
  if (!(arg instanceof inventory_pb.AddInventoryResponse)) {
    throw new Error('Expected argument of type AddInventoryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddInventoryResponse(buffer_arg) {
  return inventory_pb.AddInventoryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var InventoryServiceService = exports.InventoryServiceService = {
  addInventoryItem: {
    path: '/InventoryService/AddInventoryItem',
    requestStream: false,
    responseStream: false,
    requestType: inventory_pb.AddInventoryRequest,
    responseType: inventory_pb.AddInventoryResponse,
    requestSerialize: serialize_AddInventoryRequest,
    requestDeserialize: deserialize_AddInventoryRequest,
    responseSerialize: serialize_AddInventoryResponse,
    responseDeserialize: deserialize_AddInventoryResponse,
  },
};

exports.InventoryServiceClient = grpc.makeGenericClientConstructor(InventoryServiceService);
