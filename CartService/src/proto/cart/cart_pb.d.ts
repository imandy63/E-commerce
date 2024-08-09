// package: 
// file: cart.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CartProduct extends jspb.Message { 
    getProductid(): string;
    setProductid(value: string): CartProduct;
    getQuantity(): number;
    setQuantity(value: number): CartProduct;
    getName(): string;
    setName(value: string): CartProduct;
    getPrice(): number;
    setPrice(value: number): CartProduct;
    getShopid(): string;
    setShopid(value: string): CartProduct;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CartProduct.AsObject;
    static toObject(includeInstance: boolean, msg: CartProduct): CartProduct.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CartProduct, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CartProduct;
    static deserializeBinaryFromReader(message: CartProduct, reader: jspb.BinaryReader): CartProduct;
}

export namespace CartProduct {
    export type AsObject = {
        productid: string,
        quantity: number,
        name: string,
        price: number,
        shopid: string,
    }
}

export class CartRequest extends jspb.Message { 
    getCartid(): string;
    setCartid(value: string): CartRequest;
    getUserid(): string;
    setUserid(value: string): CartRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CartRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CartRequest): CartRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CartRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CartRequest;
    static deserializeBinaryFromReader(message: CartRequest, reader: jspb.BinaryReader): CartRequest;
}

export namespace CartRequest {
    export type AsObject = {
        cartid: string,
        userid: string,
    }
}

export class CartResponse extends jspb.Message { 
    getCartCountProduct(): number;
    setCartCountProduct(value: number): CartResponse;
    clearCartProductsList(): void;
    getCartProductsList(): Array<CartProduct>;
    setCartProductsList(value: Array<CartProduct>): CartResponse;
    addCartProducts(value?: CartProduct, index?: number): CartProduct;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CartResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CartResponse): CartResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CartResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CartResponse;
    static deserializeBinaryFromReader(message: CartResponse, reader: jspb.BinaryReader): CartResponse;
}

export namespace CartResponse {
    export type AsObject = {
        cartCountProduct: number,
        cartProductsList: Array<CartProduct.AsObject>,
    }
}

export class RemoveCartItemsRequest extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): RemoveCartItemsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveCartItemsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveCartItemsRequest): RemoveCartItemsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveCartItemsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveCartItemsRequest;
    static deserializeBinaryFromReader(message: RemoveCartItemsRequest, reader: jspb.BinaryReader): RemoveCartItemsRequest;
}

export namespace RemoveCartItemsRequest {
    export type AsObject = {
        userid: string,
    }
}

export class RemoveCartItemsResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): RemoveCartItemsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveCartItemsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveCartItemsResponse): RemoveCartItemsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveCartItemsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveCartItemsResponse;
    static deserializeBinaryFromReader(message: RemoveCartItemsResponse, reader: jspb.BinaryReader): RemoveCartItemsResponse;
}

export namespace RemoveCartItemsResponse {
    export type AsObject = {
        success: boolean,
    }
}
