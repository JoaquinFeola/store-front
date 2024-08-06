import { createContext } from "react";
import { BulkCreateStock, Stock } from "../interfaces/stock.interfaces";

interface StockContextProps {
    stockList: Stock[];
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
    handleSearch: (filters: {
        barcode: string;
        productId: number;
    }) => void;
    adjustStock: (newStock: {
        stockId: number;
        quantity: number;
        stockAdjustmentEnum: 1 | 2;
    }) => void
    bulkCreateStock: (stock: BulkCreateStock[], cb: (errorsList: string[]) => void) => Promise<void>;
    searchPagination: {
        filters: {
            barcode: string;
            productId: number;
        };
    };
    isStockLoading: boolean;
}

export const StockContext = createContext({} as StockContextProps)