import { useState } from "react";
import { AdjustmentStock, ApiResponse, ApiResponseBody, PaginateRequest, PaginateResponse } from "../interfaces";
import { httpClient } from "@/api/axios-config";
import { AxiosError } from "axios";


export const useAdjustmenStock = () => {


    const [isLoading, setIsLoading] = useState(false);
    const [internalPageIndex, setInternalPageIndex] = useState<number>(1);
    const [adjustmentStock, setAdjustmentStock] = useState<AdjustmentStock[]>([]);

    
    const [adjustmentStockPagination, setAdjustmentStockPagination] = useState({
        pageIndex: 1,
        pageSize: 10,
        totalPages: 0,
        totalSize: 0
    })



    const handleNextPage = async () => {
        if (adjustmentStockPagination.pageIndex >= adjustmentStockPagination.totalPages) return;
        setIsLoading(true)
        setInternalPageIndex(internalPageIndex + 1);
        await getAdjustmentStockPaginated(internalPageIndex + 1);
        setIsLoading(false)

    };

    const handlePreviousPage = async () => {
        if (adjustmentStockPagination.pageIndex <= 1) return;
        setIsLoading(true)

        setInternalPageIndex(internalPageIndex - 1);

        await getAdjustmentStockPaginated(internalPageIndex - 1)
        setIsLoading(false)

    };


    const createAdjustmentStock = async (adjustmentStock: Partial<AdjustmentStock>): Promise<null | AxiosError<ApiResponseBody>> => {
        try {
             await httpClient.post('/stock-adjustment/create', adjustmentStock);    
            return null;
        } 
        catch (error) {
            return error as AxiosError<ApiResponseBody>
        }
    }

    const getAdjustmentStockPaginated = async (pageIndexa?: number) => {
        setIsLoading(true)
        try {
            const params: PaginateRequest = {
                pageIndex: pageIndexa ?? internalPageIndex,
                pageSize: 0,
                ProductId: 0
            }
            const response: ApiResponse<PaginateResponse> = await httpClient.get('stock-adjustment/paginate', {
                params
            });
            const { pageIndex: pageIndexApi, pageSize, totalPages, totalSize } = response.data.data;
            setAdjustmentStockPagination({
                pageIndex: pageIndexApi,
                pageSize: pageSize,
                totalPages: totalPages,
                totalSize: totalSize
            });
            setAdjustmentStock(response.data.data.rows);
        }
        catch (error) {
            return error as AxiosError;
        }
        finally {
            setIsLoading(false);
        }

    }


    return {
        handleNextPage,
        adjustmentStockPagination,
        getAdjustmentStockPaginated,
        handlePreviousPage,
        isLoading,
        createAdjustmentStock,
        adjustmentStock

    }
}
