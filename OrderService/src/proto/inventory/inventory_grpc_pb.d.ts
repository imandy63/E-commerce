// package: 
// file: inventory.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as inventory_pb from "./inventory_pb";

interface IInventoryServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    addInventoryItem: IInventoryServiceService_IAddInventoryItem;
    reserveInventory: IInventoryServiceService_IReserveInventory;
}

interface IInventoryServiceService_IAddInventoryItem extends grpc.MethodDefinition<inventory_pb.AddInventoryRequest, inventory_pb.AddInventoryResponse> {
    path: "/InventoryService/AddInventoryItem";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<inventory_pb.AddInventoryRequest>;
    requestDeserialize: grpc.deserialize<inventory_pb.AddInventoryRequest>;
    responseSerialize: grpc.serialize<inventory_pb.AddInventoryResponse>;
    responseDeserialize: grpc.deserialize<inventory_pb.AddInventoryResponse>;
}
interface IInventoryServiceService_IReserveInventory extends grpc.MethodDefinition<inventory_pb.ReserveInventoryRequest, inventory_pb.ReserveInventoryResponse> {
    path: "/InventoryService/ReserveInventory";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<inventory_pb.ReserveInventoryRequest>;
    requestDeserialize: grpc.deserialize<inventory_pb.ReserveInventoryRequest>;
    responseSerialize: grpc.serialize<inventory_pb.ReserveInventoryResponse>;
    responseDeserialize: grpc.deserialize<inventory_pb.ReserveInventoryResponse>;
}

export const InventoryServiceService: IInventoryServiceService;

export interface IInventoryServiceServer extends grpc.UntypedServiceImplementation {
    addInventoryItem: grpc.handleUnaryCall<inventory_pb.AddInventoryRequest, inventory_pb.AddInventoryResponse>;
    reserveInventory: grpc.handleUnaryCall<inventory_pb.ReserveInventoryRequest, inventory_pb.ReserveInventoryResponse>;
}

export interface IInventoryServiceClient {
    addInventoryItem(request: inventory_pb.AddInventoryRequest, callback: (error: grpc.ServiceError | null, response: inventory_pb.AddInventoryResponse) => void): grpc.ClientUnaryCall;
    addInventoryItem(request: inventory_pb.AddInventoryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: inventory_pb.AddInventoryResponse) => void): grpc.ClientUnaryCall;
    addInventoryItem(request: inventory_pb.AddInventoryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: inventory_pb.AddInventoryResponse) => void): grpc.ClientUnaryCall;
    reserveInventory(request: inventory_pb.ReserveInventoryRequest, callback: (error: grpc.ServiceError | null, response: inventory_pb.ReserveInventoryResponse) => void): grpc.ClientUnaryCall;
    reserveInventory(request: inventory_pb.ReserveInventoryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: inventory_pb.ReserveInventoryResponse) => void): grpc.ClientUnaryCall;
    reserveInventory(request: inventory_pb.ReserveInventoryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: inventory_pb.ReserveInventoryResponse) => void): grpc.ClientUnaryCall;
}

export class InventoryServiceClient extends grpc.Client implements IInventoryServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public addInventoryItem(request: inventory_pb.AddInventoryRequest, callback: (error: grpc.ServiceError | null, response: inventory_pb.AddInventoryResponse) => void): grpc.ClientUnaryCall;
    public addInventoryItem(request: inventory_pb.AddInventoryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: inventory_pb.AddInventoryResponse) => void): grpc.ClientUnaryCall;
    public addInventoryItem(request: inventory_pb.AddInventoryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: inventory_pb.AddInventoryResponse) => void): grpc.ClientUnaryCall;
    public reserveInventory(request: inventory_pb.ReserveInventoryRequest, callback: (error: grpc.ServiceError | null, response: inventory_pb.ReserveInventoryResponse) => void): grpc.ClientUnaryCall;
    public reserveInventory(request: inventory_pb.ReserveInventoryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: inventory_pb.ReserveInventoryResponse) => void): grpc.ClientUnaryCall;
    public reserveInventory(request: inventory_pb.ReserveInventoryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: inventory_pb.ReserveInventoryResponse) => void): grpc.ClientUnaryCall;
}
