import { useState } from "react"
import { ProductForSale } from "../interfaces/product.interfaces"
import { httpClient } from "../api/axios-config";
import { ApiResponse, ApiResponseBody, Sale, SaleForHome, SaleForHomeYear, SaleRequest, SalesParamsRequest } from "../interfaces";
import { AxiosError } from "axios";




interface SalesPaginateResponse {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalSize: number;
    rows: Sale[];
}

export const useSales = () => {

    const [obtainedProducts, setObtainedProducts] = useState<ProductForSale[]>([]);
    const [isSalesLoading, setIsSalesLoading] = useState(false)
    const [salesPagination, setSalesPagination] = useState({
        pageIndex: 1,
        pageSize: 10,
        totalPages: 0,
        totalSize: 0,
    });
    const [sales, setSalesPaginated] = useState<Sale[]>([]);
    const [salesPageIndexInternal, setSalesPageIndexInternal] = useState(1);


    const getSalesForHomeYear = async () => {
        try {
            const response: ApiResponse<SaleForHomeYear> = await httpClient.get('/sale/for-home/all-year')
            return response.data.data
        } catch (error) {
            return null
        }
    }
    const getSalesForHome = async () => {
        try {
            const response: ApiResponse<SaleForHome> = await httpClient.get('/sale/for-home');

            return response.data;
        } catch (error) {
            return null;
        }
    }

    const handleNextPage = async () => {
        if (salesPagination.pageIndex >= salesPagination.totalPages) return;
        setSalesPageIndexInternal(salesPageIndexInternal + 1);
        await getSalesPaginated(salesPageIndexInternal + 1);

    }
    const handlePreviousPage = async () => {
        if (salesPagination.pageIndex <= 1) return;
        setSalesPageIndexInternal(salesPageIndexInternal - 1);
        await getSalesPaginated(salesPageIndexInternal - 1)

    }


    const scanProductCodebar = (search: string): null | ProductForSale => {
        if (obtainedProducts.length === 0) return null;
        try {
            const foundProduct = obtainedProducts.find(product => {
                const barcodesFound = product.barCodes.find(bc => bc.code === search);

                if (barcodesFound) return barcodesFound;

                return product.sku === search
            });

            if (foundProduct === undefined) return null;

            return foundProduct;
        }
        catch (error) {
            return null
        }
    };

    const getSaleById = (id: number) => {
        try {
            return 
        } catch (error) {
            
        }
    };
    const createSale = async (sale: SaleRequest) => {
        try {
            const newSale: ApiResponse = await httpClient.post('/sale/create', sale);

            return {
                hasErrors: false,
                message: newSale.data.message
            }
        }
        catch (error) {

            const err = error as AxiosError<ApiResponseBody>;
            return {
                hasErrors: true,
                message: err.response?.data.message
            }
        }
    }

    const getProductsForSale = async () => {
        try {



            const response: ApiResponse<ProductForSale[]> = await httpClient.get('product/for-sale');
            setObtainedProducts(response.data.data);
        }
        catch (error) {
            return error as AxiosError;
        }
    };


    const getSalesPaginated = async (newPageIndex?: number) => {
        setIsSalesLoading(true)
        try {

            const params: SalesParamsRequest = {
                pageIndex: newPageIndex ?? salesPageIndexInternal,
                pageSize: 15
            }
            const response: ApiResponse<SalesPaginateResponse> = await httpClient.get('sale/paginate', { params })
            setSalesPagination({
                pageIndex: response.data.data.pageIndex,
                totalPages: response.data.data.totalPages,
                totalSize: response.data.data.totalSize,
                pageSize: response.data.data.pageSize
            })
            setSalesPaginated(response.data.data.rows);

        }
        catch (error) {

        }
        finally {
            setIsSalesLoading(false)

        }
    }
    return {
        getProductsForSale,
        scanProductCodebar,
        obtainedProducts,
        createSale,
        getSalesPaginated,
        salesPageIndexInternal,
        handleNextPage,
        handlePreviousPage,
        sales,
        isSalesLoading,
        salesPagination,
        getSalesForHome,
        getSalesForHomeYear

    }


}
