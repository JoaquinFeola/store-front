import { useCallback, useContext, useState } from "react"
import { BulkCreateStock, Stock, StockRequestDTO } from "../interfaces/stock.interfaces";
import { ApiResponse } from "../interfaces";
import { httpClient } from "../api/axios-config";
import { AlertsContext, ProductsContext } from "../context";

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
    const { getAllProducts } = useContext(ProductsContext);
    const [stockList, setStockList] = useState<Stock[]>([]);
    const [isImportingProducts, setIsImportingProducts] = useState(false);
    const [ hasProducts, setHasProducts ] = useState(false);
    const [ isStocLoading, setIsStockLoading ] = useState(false)
 
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
            ...searchPagination,
            filters: filters
        })

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


    const importAllProducts = async () => {
        try {
            setIsImportingProducts(true)
            const products = await getAllProducts();

            if (products.length === 0) {
                setIsImportingProducts(false)
                setHasProducts(false);
                return;
            };


            setHasProducts(true);
            const mapProductsToCreateStock: BulkCreateStock[] = products.map((pr) => {
                return {
                    productId: pr.id,
                    quantity: 1,
                }
            });


            const response: ApiResponse = await httpClient.post('stock/bulk', mapProductsToCreateStock);
            
            addAlert({
                duration: 5000,
                message: response.data.message,
                type: 'success'
            })


        }
        catch (error) {
            addAlert({
                duration: 5000,
                message: 'Ocurrió un error al importar todos los productos',
                type: 'success'
            })
        }
        finally {
            setIsImportingProducts(false)
            
        }
    };

    const getStockPaginated = useCallback(async (newPageIndex?: number) => {
        setIsStockLoading(true);
        try {
            const reqParams: StockRequestDTO = {
                ...searchPagination.filters.barcode === '' ? {} : {BarCode: searchPagination.filters.barcode},
                pageIndex: newPageIndex ?? stockPageIndexInternal,
                pageSize: stockPagination.pageSize,
                ProductId: searchPagination.filters.productId
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
    }, []);




    return {
        stockList,
        isImportingProducts,
        hasProducts,
        stockPageIndexInternal,
        stockPagination,
        isStocLoading,
        searchPagination,
        getStockPaginated,
        handleNextPage,
        handlePreviousPage,
        importAllProducts,
        handleSearch
    }

}
