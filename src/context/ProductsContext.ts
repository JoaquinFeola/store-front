import { createContext } from "react";
import { Product, ProductDTO } from "../interfaces/product.interfaces";
import { AxiosError } from "axios";


interface ProductsContextProps {

    products: Product[];
    productsPagination: {
        pageIndex: number;
        pageSize: number;
        totalPages: number;
        totalSize: number;
    };
    deleteProduct:(id: number)  => Promise<void>;
    updateProduct: (newProduct: ProductDTO,id: number) => Promise<void>;
    createProduct: (newProduct: ProductDTO) => Promise<void>;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    getAllProducts: () => Promise<Product[]>,
    getProductById: (id: number | string) => Promise<Product | AxiosError>;
    isProductsLoading: boolean; 
}


export const ProductsContext = createContext({} as ProductsContextProps);