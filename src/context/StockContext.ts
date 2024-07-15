import { createContext } from "react";
import { Stock } from "../interfaces/stock.interfaces";

interface StockContextProps {
    stockList: Stock[];
    isImportingProducts: boolean;
    hasProducts: boolean;
    stockPageIndexInternal: number;
    stockPagination: {
        pageIndex: number;
        pageSize: number;
        totalPages: number;
        totalSize: number;
    };
    getStockPaginated: (newPageIndex?: number) => Promise<void>;
    handleNextPage: () => Promise<void>;
    handlePreviousPage: () => Promise<void>;
    importAllProducts: () => Promise<void>;
    handleSearch: (filters: {
        barcode: string;
        productId: number;
    }) => void;
    searchPagination: {
        filters: {
            barcode: string;
            productId: number;
        };
    };
    isStockLoading: boolean;
}

export const StockContext = createContext({} as StockContextProps)