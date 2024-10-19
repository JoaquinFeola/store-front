import { createContext } from "react";
import { Product, ProductDTO, ProductToImport } from "../interfaces/product.interfaces";
import { AxiosError } from "axios";
import { ApiResponseBody } from "../interfaces";


interface ProductsContextProps {

    products: Product[];
    productsPagination: {
        pageIndex: number;
        pageSize: number;
        totalPages: number;
        totalSize: number;
    };
    deleteProduct: (id: number) => Promise<void>;
    updateProduct: (newProduct: ProductDTO, id: number) => Promise<AxiosError<ApiResponseBody<null>, any> | null>
    createProduct: (newProduct: ProductDTO) => Promise<null | AxiosError<ApiResponseBody<null>, any>>
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    getAllProducts: () => Promise<Product[]>,
    getProductById: (id: number | string) => Promise<{
        hasErrors: boolean;
        response: Product;
    } | {
        hasErrors: boolean;
        response: {
            errors: string[];
            errCode: number;
        };
    }>
    handleSearch: (filters: {
        sku: string;
        barcode: string;
        supplierId: number;
        categoryId: number;
    }) => void;
    isProductsLoading: boolean;
    getProductsPaginated: () => Promise<void>,
    searchPagination: {
        filters: {
            sku: string;
            barcode: string;
            supplierId: number;
            categoryId: number;
        };
    };
    bulkCreateProducts: (products: ProductToImport[]) => Promise<ApiResponseBody<null>>;
    updateSalePriceForSupplierId: (body: { supplierId: number; percentageToUp: number }) => Promise<void>;
    productPageIndexInternal: number;
}


export const ProductsContext = createContext({} as ProductsContextProps);