import { useContext, useState } from "react"
import { BulkCreateStock, Stock, StockRequestDTO } from "../interfaces/stock.interfaces";
import { ApiResponse, ApiResponseBody } from "../interfaces";
import { httpClient } from "../api/axios-config";   
import { AlertsContext } from "../context";
import { AxiosError } from "axios";

interface StockPaginateResponse {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalSize: number;
    rows: Stock[];
}


const initialSearchPagination = {
    barcode: '',
    productId: 0,

}
export const useStock = () => {
    const { addAlert } = useContext(AlertsContext);
    const [stockList, setStockList] = useState<Stock[]>([]);
    const [isStockLoading, setIsStockLoading] = useState(false)
    const [stockPageIndexInternal, setStockPageIndexInternal] = useState(1);
    const [stockPagination, setStockPagination] = useState({
        pageIndex: 1,
        pageSize: 10,
        totalPages: 0,
        totalSize: 0,
    });
    const [searchPagination, setSearchPagination] = useState({
        filters: initialSearchPagination,
    });

    const handleSearch = (filters: typeof searchPagination.filters) => {
        setSearchPagination({
            filters: filters
        });
        setStockPageIndexInternal(1);
    }


    const handleNextPage = async () => {
        if (stockPagination.pageIndex >= stockPagination.totalPages) return;
        setStockPageIndexInternal(stockPageIndexInternal + 1);
        await getStockPaginated(stockPageIndexInternal + 1);

    };

    const handlePreviousPage = async () => {
        if (stockPagination.pageIndex <= 1) return;
        setStockPageIndexInternal(stockPageIndexInternal - 1);
        await getStockPaginated(stockPageIndexInternal - 1)

    };

    const adjustStock = async (newStock: { stockId: number; quantity: number; stockAdjustmentEnum: 1 | 2 }) => {
        try {
            const response: ApiResponse = await httpClient.post('stock/adjustment', newStock)

            addAlert({
                duration: 5000,
                message: response.data.message,
                type: 'success'
            })
            await getStockPaginated()
        }
        catch (error) {

        }
    }

    const bulkCreateStock = async (stock: BulkCreateStock[], cb: (errorsList: string[]) => void) => {
        try {
            const response: ApiResponse = await httpClient.post('stock/bulk', stock);
            addAlert({
                duration: 5000,
                message: response.data.message,
                type: 'success'
            })

                // const errors = response.data.errors as string[];
                // addAlert({
                //     duration: 10000,
                //     message: `${errors.join('\n')}`,
                //     type: 'error'
                // })
                cb(response.data?.errors!)

        }
        catch (error) {
            const err = error as AxiosError<ApiResponseBody>

            addAlert({
                duration: 5000,
                message: err.response?.data.message ?? 'Ocurrio un error al crear el stock',
                type: 'error'
            })
        }
    };


    const getStockPaginated = async (newPageIndex?: number) => {
        setIsStockLoading(true);
        try {
            const reqParams: StockRequestDTO = {
                pageIndex: newPageIndex ?? stockPageIndexInternal,
                pageSize: stockPagination.pageSize,
                ProductId: searchPagination.filters.productId
            }
            if (searchPagination.filters.barcode !== '') {
                reqParams.BarCode = searchPagination.filters.barcode
            }
            const response: ApiResponse<StockPaginateResponse> = await httpClient.get('stock/paginate', { params: reqParams })
            const { pageIndex, pageSize, rows, totalPages, totalSize } = response.data.data;

            setStockPagination({
                pageIndex: pageIndex,
                pageSize: pageSize,
                totalPages: totalPages,
                totalSize: totalSize,
            });

            setStockList(rows);

        }
        catch (error) {
            addAlert({
                duration: 6000,
                message: 'Hubo un error al intentar obtener el stock de los productos',
                type: 'error',
            });
        }
        finally {
            setIsStockLoading(false)
        }
    };




    return {
        stockList,
        stockPageIndexInternal,
        stockPagination,
        isStockLoading,
        searchPagination,
        getStockPaginated,
        handleNextPage,
        handlePreviousPage,
        handleSearch,
        bulkCreateStock,
        adjustStock
    }

}
