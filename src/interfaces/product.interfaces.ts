import { Category } from "./category.interfaces";
import { Supplier } from "./suppliers.interfaces";



export interface Product {
    id: number;
    sku: string;
    description: string;
    purchasePrice: number;
    percentageProfit: number;
    productCategories?: {category:  Category}[],
    providerId?: number;
    provider?: Supplier;
    salePrice: number;
    image?: string;
    barCodes?: {code: string}[],
    expirationDate?: string | null;
    created: Date;
    updated?: Date | null;
}

export interface ProductRequestDTO {
    pageSize: number;
    pageIndex: number;
    SKU?: string;
    ProviderId: number;
    CategoryId: number;
    BarCode?: string;
}


export interface ProductPriceBySupplierRequestDTO {
    ProviderId: number;
    PercentageToUp: number;
}

export interface ProductDTO {
    sku: string;
    description: string;
    purchasePrice: number;
    percentageProfit: number;
    image?: string | null,
    providerId?: number,
    categoriesIds?: number[] | null,   
    barCodes?: string[] | null,
    expirationDate?: string | null,
}