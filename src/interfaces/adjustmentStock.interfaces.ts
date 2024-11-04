import { Product } from "./product.interfaces";



export interface PaginateResponse {
    pageIndex: number,
    pageSize: number;
    totalPages: number,
    totalSize: number;
    rows: AdjustmentStock[];
    hasErrors: boolean;
    message: string;
    statusCode: number;
    errors: null | string[];

}


export interface PaginateRequest {
    ProductId: number;
    pageIndex: number;
    pageSize: number;
}

export interface AdjustmentStock {
    id: number;
    productId: number,
    product: Product;
    stockAdjustmentTypeId: StockAdjustmentTypeId;
    stockAdjustmentType: StockAdjustmentType;
    quantity: number;
    motive: string;
    createdAt: Date;

}

export interface StockAdjustmentType {
    id: number;
    description: string;
}

export enum StockAdjustmentTypeId {
    Positivo = 1,
    Negativo = 2
}