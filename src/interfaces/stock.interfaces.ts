import { Product } from "./product.interfaces";


export interface Stock {
    id: number;
    productId: number;
    quantity: never;
    createdAt: Date;
    UpdatedAt: Date;
    product: Product
}


export interface StockRequestDTO {
    ProductId: number;
    BarCode?: string;
    pageIndex: number;
    pageSize: number;
}


export interface StockImportTemplate {
    idStock?: string;
    productoId?: string;
    cantidad: string;
}

export interface BulkCreateStock {
    productId: number;
    quantity: number,
    stockId?: number;
}