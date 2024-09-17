import { createContext } from "react";
import { ApiResponseBody, Sale, SaleForHome, SaleForHomeYear, SaleRequest } from "../interfaces";
import { ProductForSale } from "../interfaces/product.interfaces";
import { AxiosError } from "axios";


interface SalesContextProps {
    getProductsForSale: () => Promise<AxiosError<unknown, any> | undefined>;
    scanProductCodebar: (search: string) => null | ProductForSale;
    obtainedProducts: ProductForSale[];
    createSale: (sale: SaleRequest) => Promise<{
        hasErrors: boolean;
        message: string | undefined;
    }>;
    getSalesPaginated: (pageIndex?: number) => Promise<void>;
    salesPageIndexInternal: number;
    handleNextPage: () => Promise<void>;
    handlePreviousPage: () => Promise<void>;
    sales: Sale[],
    isSalesLoading: boolean;
    salesPagination: {
        pageIndex: number;
        pageSize: number;
        totalPages: number;
        totalSize: number;
    },
    getSalesForHome: () => Promise<ApiResponseBody<SaleForHome> | null>;
    getSalesForHomeYear: () => Promise<SaleForHomeYear | null>;
    getSaleById: (id: number) => Promise<Sale | null>
}

export const SalesContext = createContext({} as SalesContextProps);