// package: 
// file: inventory.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class AddInventoryRequest extends jspb.Message { 
    getProductid(): string;
    setProductid(value: string): AddInventoryRequest;
    getStock(): number;
    setStock(value: number): AddInventoryRequest;
    getShopid(): string;
    setShopid(value: string): AddInventoryRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddInventoryRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddInventoryRequest): AddInventoryRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddInventoryRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddInventoryRequest;
    static deserializeBinaryFromReader(message: AddInventoryRequest, reader: jspb.BinaryReader): AddInventoryRequest;
}

export namespace AddInventoryRequest {
    export type AsObject = {
        productid: string,
        stock: number,
        shopid: string,
    }
}

export class AddInventoryResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddInventoryResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddInventoryResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AddInventoryResponse): AddInventoryResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddInventoryResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddInventoryResponse;
    static deserializeBinaryFromReader(message: AddInventoryResponse, reader: jspb.BinaryReader): AddInventoryResponse;
}

export namespace AddInventoryResponse {
    export type AsObject = {
        success: boolean,
    }
}
