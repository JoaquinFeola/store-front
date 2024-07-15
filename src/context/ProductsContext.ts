import { createContext } from "react";
import { Product, ProductDTO } from "../interfaces/product.interfaces";
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
    getProductById: (id: number | string) => Promise<Product | AxiosError>;
    handleSearch: (filters: {
        sku: string;
        barcode: string;
        providerId: number;
        categoryId: number;
    }) => void;
    isProductsLoading: boolean;
    getProductsPaginated: () => Promise<void>,
    productsPageIndexInternal: number;
    searchPagination: {
        filters: {
            sku: string;
            barcode: string;
            providerId: number;
            categoryId: number;
        };
    };
    updateSalePriceForSupplierId: (body: { providerId: number; percentageToUp: number }) => Promise<void>;

}


export const ProductsContext = createContext({} as ProductsContextProps);