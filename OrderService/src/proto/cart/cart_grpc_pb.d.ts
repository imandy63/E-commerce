// package: 
// file: cart.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as cart_pb from "./cart_pb";

interface ICartServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getCartDetails: ICartServiceService_IGetCartDetails;
    removeCartItems: ICartServiceService_IRemoveCartItems;
}

interface ICartServiceService_IGetCartDetails extends grpc.MethodDefinition<cart_pb.CartRequest, cart_pb.CartResponse> {
    path: "/CartService/GetCartDetails";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cart_pb.CartRequest>;
    requestDeserialize: grpc.deserialize<cart_pb.CartRequest>;
    responseSerialize: grpc.serialize<cart_pb.CartResponse>;
    responseDeserialize: grpc.deserialize<cart_pb.CartResponse>;
}
interface ICartServiceService_IRemoveCartItems extends grpc.MethodDefinition<cart_pb.RemoveCartItemsRequest, cart_pb.RemoveCartItemsResponse> {
    path: "/CartService/RemoveCartItems";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cart_pb.RemoveCartItemsRequest>;
    requestDeserialize: grpc.deserialize<cart_pb.RemoveCartItemsRequest>;
    responseSerialize: grpc.serialize<cart_pb.RemoveCartItemsResponse>;
    responseDeserialize: grpc.deserialize<cart_pb.RemoveCartItemsResponse>;
}

export const CartServiceService: ICartServiceService;

export interface ICartServiceServer extends grpc.UntypedServiceImplementation {
    getCartDetails: grpc.handleUnaryCall<cart_pb.CartRequest, cart_pb.CartResponse>;
    removeCartItems: grpc.handleUnaryCall<cart_pb.RemoveCartItemsRequest, cart_pb.RemoveCartItemsResponse>;
}

export interface ICartServiceClient {
    getCartDetails(request: cart_pb.CartRequest, callback: (error: grpc.ServiceError | null, response: cart_pb.CartResponse) => void): grpc.ClientUnaryCall;
    getCartDetails(request: cart_pb.CartRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cart_pb.CartResponse) => void): grpc.ClientUnaryCall;
    getCartDetails(request: cart_pb.CartRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cart_pb.CartResponse) => void): grpc.ClientUnaryCall;
    removeCartItems(request: cart_pb.RemoveCartItemsRequest, callback: (error: grpc.ServiceError | null, response: cart_pb.RemoveCartItemsResponse) => void): grpc.ClientUnaryCall;
    removeCartItems(request: cart_pb.RemoveCartItemsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cart_pb.RemoveCartItemsResponse) => void): grpc.ClientUnaryCall;
    removeCartItems(request: cart_pb.RemoveCartItemsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cart_pb.RemoveCartItemsResponse) => void): grpc.ClientUnaryCall;
}

export class CartServiceClient extends grpc.Client implements ICartServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getCartDetails(request: cart_pb.CartRequest, callback: (error: grpc.ServiceError | null, response: cart_pb.CartResponse) => void): grpc.ClientUnaryCall;
    public getCartDetails(request: cart_pb.CartRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cart_pb.CartResponse) => void): grpc.ClientUnaryCall;
    public getCartDetails(request: cart_pb.CartRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cart_pb.CartResponse) => void): grpc.ClientUnaryCall;
    public removeCartItems(request: cart_pb.RemoveCartItemsRequest, callback: (error: grpc.ServiceError | null, response: cart_pb.RemoveCartItemsResponse) => void): grpc.ClientUnaryCall;
    public removeCartItems(request: cart_pb.RemoveCartItemsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cart_pb.RemoveCartItemsResponse) => void): grpc.ClientUnaryCall;
    public removeCartItems(request: cart_pb.RemoveCartItemsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cart_pb.RemoveCartItemsResponse) => void): grpc.ClientUnaryCall;
}
