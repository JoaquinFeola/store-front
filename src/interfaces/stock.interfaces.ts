import { Product } from "./product.interfaces";


export interface Stock {
    id: number;
    productId: number;
    quantity: never;
    created: Date;
    updated: Date;
    product: Product
}


export interface StockRequestDTO {
    ProductId: number;
    BarCode?: string;
    pageIndex: number;
    pageSize: number;
}


export interface BulkCreateStock {
    productId: number;
    quantity: number,
    stockId?: number;
}