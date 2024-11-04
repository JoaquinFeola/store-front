import { AdjustmentStock, ApiResponseBody } from "@/interfaces";
import { AxiosError } from "axios";
import { createContext } from "react";


interface AdjustmentStockContext {
    handleNextPage: () => Promise<void>;
    adjustmentStockPagination: {
        pageIndex: number;
        pageSize: number;
        totalPages: number;
        totalSize: number;
    };
    getAdjustmentStockPaginated: (pageIndexa?: number) => Promise<AxiosError | undefined>;
    handlePreviousPage: () => Promise<void>;
    isLoading: boolean;
    createAdjustmentStock: (adjustmentStock: Partial<AdjustmentStock>) =>  Promise<null | AxiosError<ApiResponseBody>>;
    adjustmentStock: AdjustmentStock[];
}

export const AdjustmentStockContext = createContext({} as AdjustmentStockContext)