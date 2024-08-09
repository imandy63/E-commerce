// package: 
// file: product.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetProductByIdRequest extends jspb.Message { 
    getProductid(): string;
    setProductid(value: string): GetProductByIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProductByIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetProductByIdRequest): GetProductByIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetProductByIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetProductByIdRequest;
    static deserializeBinaryFromReader(message: GetProductByIdRequest, reader: jspb.BinaryReader): GetProductByIdRequest;
}

export namespace GetProductByIdRequest {
    export type AsObject = {
        productid: string,
    }
}

export class GetProductByIdResponse extends jspb.Message { 
    getProductid(): string;
    setProductid(value: string): GetProductByIdResponse;
    getShopid(): string;
    setShopid(value: string): GetProductByIdResponse;
    getName(): string;
    setName(value: string): GetProductByIdResponse;
    getQuantity(): number;
    setQuantity(value: number): GetProductByIdResponse;
    getPrice(): number;
    setPrice(value: number): GetProductByIdResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProductByIdResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetProductByIdResponse): GetProductByIdResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetProductByIdResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetProductByIdResponse;
    static deserializeBinaryFromReader(message: GetProductByIdResponse, reader: jspb.BinaryReader): GetProductByIdResponse;
}

export namespace GetProductByIdResponse {
    export type AsObject = {
        productid: string,
        shopid: string,
        name: string,
        quantity: number,
        price: number,
    }
}
