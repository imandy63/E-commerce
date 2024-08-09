// package: 
// file: product.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as product_pb from "./product_pb";

interface IProductServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getProductById: IProductServiceService_IGetProductById;
}

interface IProductServiceService_IGetProductById extends grpc.MethodDefinition<product_pb.GetProductByIdRequest, product_pb.GetProductByIdResponse> {
    path: "/ProductService/GetProductById";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<product_pb.GetProductByIdRequest>;
    requestDeserialize: grpc.deserialize<product_pb.GetProductByIdRequest>;
    responseSerialize: grpc.serialize<product_pb.GetProductByIdResponse>;
    responseDeserialize: grpc.deserialize<product_pb.GetProductByIdResponse>;
}

export const ProductServiceService: IProductServiceService;

export interface IProductServiceServer extends grpc.UntypedServiceImplementation {
    getProductById: grpc.handleUnaryCall<product_pb.GetProductByIdRequest, product_pb.GetProductByIdResponse>;
}

export interface IProductServiceClient {
    getProductById(request: product_pb.GetProductByIdRequest, callback: (error: grpc.ServiceError | null, response: product_pb.GetProductByIdResponse) => void): grpc.ClientUnaryCall;
    getProductById(request: product_pb.GetProductByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: product_pb.GetProductByIdResponse) => void): grpc.ClientUnaryCall;
    getProductById(request: product_pb.GetProductByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: product_pb.GetProductByIdResponse) => void): grpc.ClientUnaryCall;
}

export class ProductServiceClient extends grpc.Client implements IProductServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getProductById(request: product_pb.GetProductByIdRequest, callback: (error: grpc.ServiceError | null, response: product_pb.GetProductByIdResponse) => void): grpc.ClientUnaryCall;
    public getProductById(request: product_pb.GetProductByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: product_pb.GetProductByIdResponse) => void): grpc.ClientUnaryCall;
    public getProductById(request: product_pb.GetProductByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: product_pb.GetProductByIdResponse) => void): grpc.ClientUnaryCall;
}
