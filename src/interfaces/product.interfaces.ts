import { Category } from "./category.interfaces";
import { Supplier } from "./suppliers.interfaces";






export interface Product {
    id: number;
    sku: string;
    description: string;
    purchasePrice: number;
    percentageProfit: number;
    productCategories?: { category: Category }[],
    supplierId?: number;
    supplier?: Supplier;
    salePrice: number;
    image?: string;
    barCodes?: { code: string }[],
    expirationDate?: string | null;
    CreatedAt: Date;
    UpdatedAt?: Date | null;
    isDeleted?: boolean;
}

export interface ProductRequestDTO {
    pageSize: number;
    pageIndex: number;
    SKU?: string;
    SupplierId: number;
    CategoryId: number;
    BarCode?: string;
}

export interface ProductInCart extends ProductForSale {
    quantity: number;
}

export interface ProductForSale {
    id: number;
    sku: string;
    description: string;
    barCodes: { code: string }[];
    salePrice: number;
    image: string;
}

export interface ImportProductTemplate {
    productoId?: string;
    sku: string;
    descripcion: string;
    proveedorId: string;
    categoriaId: string;
    codigoDeBarras: string;
    precioCompra: string;
    porcentajeGanancia: string;
    fechaExpiracion: string;
}
export interface ProductToImport {
    productId?: number;
    sku: string;
    description: string;
    supplierId: number;
    categoryId: number;
    barCode: string;
    purchasePrice: number;
    percentageProfit: number;
    expirationDate: string;
}


export interface ProductPriceBySupplierRequestDTO {
    supplierId: number;
    PercentageToUp: number;
}

export interface ProductDTO {
    sku: string;
    description: string;
    purchasePrice: number;
    percentageProfit: number;
    image?: string | null,
    supplierId?: number,
    categoriesIds?: number[] | null,
    barCodes?: string[] | null,
    expirationDate?: string | null,
}