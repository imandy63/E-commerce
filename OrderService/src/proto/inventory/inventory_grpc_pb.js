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

function serialize_ReserveInventoryRequest(arg) {
  if (!(arg instanceof inventory_pb.ReserveInventoryRequest)) {
    throw new Error('Expected argument of type ReserveInventoryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ReserveInventoryRequest(buffer_arg) {
  return inventory_pb.ReserveInventoryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ReserveInventoryResponse(arg) {
  if (!(arg instanceof inventory_pb.ReserveInventoryResponse)) {
    throw new Error('Expected argument of type ReserveInventoryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ReserveInventoryResponse(buffer_arg) {
  return inventory_pb.ReserveInventoryResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
  reserveInventory: {
    path: '/InventoryService/ReserveInventory',
    requestStream: false,
    responseStream: false,
    requestType: inventory_pb.ReserveInventoryRequest,
    responseType: inventory_pb.ReserveInventoryResponse,
    requestSerialize: serialize_ReserveInventoryRequest,
    requestDeserialize: deserialize_ReserveInventoryRequest,
    responseSerialize: serialize_ReserveInventoryResponse,
    responseDeserialize: deserialize_ReserveInventoryResponse,
  },
};

exports.InventoryServiceClient = grpc.makeGenericClientConstructor(InventoryServiceService);
