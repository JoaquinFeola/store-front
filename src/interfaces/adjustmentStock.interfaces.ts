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
    stockAdjustmentType: string;
    quantity: number;
    motive: string;
    createdAt: Date;

}

export enum StockAdjustmentTypeId {
    Increase = 1,
    Decrease = 2
}