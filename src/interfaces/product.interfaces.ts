import { Category } from "./category.interfaces";
import { Supplier } from "./suppliers.interfaces";



export interface Product {
    id: number;
    sku: string;
    description: string;
    purchasePrice: number;
    percentageProfit: number;
    productCategories?: {category:  Category}[],
    productProviders?: {provider: Supplier}[]
    salePrice: number;
    image?: string;
    barCodes?: {code: string}[],
    expirationDate?: string | null;
    created: Date;
    updated?: Date | null;
}



export interface ProductDTO {
    sku: string;
    description: string;
    purchasePrice: number;
    percentageProfit: number;
    salePrice: number,
    image?: string | null,
    productProviders?: number[] | null,
    productCategories?: number[] | null,   
    barCodes?: string[] | null,
    expirationDate?: string | null,
}