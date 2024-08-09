// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var cart_pb = require('./cart_pb.js');

function serialize_CartRequest(arg) {
  if (!(arg instanceof cart_pb.CartRequest)) {
    throw new Error('Expected argument of type CartRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CartRequest(buffer_arg) {
  return cart_pb.CartRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CartResponse(arg) {
  if (!(arg instanceof cart_pb.CartResponse)) {
    throw new Error('Expected argument of type CartResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CartResponse(buffer_arg) {
  return cart_pb.CartResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_RemoveCartItemsRequest(arg) {
  if (!(arg instanceof cart_pb.RemoveCartItemsRequest)) {
    throw new Error('Expected argument of type RemoveCartItemsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RemoveCartItemsRequest(buffer_arg) {
  return cart_pb.RemoveCartItemsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_RemoveCartItemsResponse(arg) {
  if (!(arg instanceof cart_pb.RemoveCartItemsResponse)) {
    throw new Error('Expected argument of type RemoveCartItemsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RemoveCartItemsResponse(buffer_arg) {
  return cart_pb.RemoveCartItemsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CartServiceService = exports.CartServiceService = {
  getCartDetails: {
    path: '/CartService/GetCartDetails',
    requestStream: false,
    responseStream: false,
    requestType: cart_pb.CartRequest,
    responseType: cart_pb.CartResponse,
    requestSerialize: serialize_CartRequest,
    requestDeserialize: deserialize_CartRequest,
    responseSerialize: serialize_CartResponse,
    responseDeserialize: deserialize_CartResponse,
  },
  removeCartItems: {
    path: '/CartService/RemoveCartItems',
    requestStream: false,
    responseStream: false,
    requestType: cart_pb.RemoveCartItemsRequest,
    responseType: cart_pb.RemoveCartItemsResponse,
    requestSerialize: serialize_RemoveCartItemsRequest,
    requestDeserialize: deserialize_RemoveCartItemsRequest,
    responseSerialize: serialize_RemoveCartItemsResponse,
    responseDeserialize: deserialize_RemoveCartItemsResponse,
  },
};

exports.CartServiceClient = grpc.makeGenericClientConstructor(CartServiceService);
