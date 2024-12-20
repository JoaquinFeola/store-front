import { useContext, useReducer, useState } from "react"
import { AlertsContext } from "../../context";
import { ApiResponse, ApiResponseBody } from "../../interfaces";
import { httpClient } from "../../api/axios-config";
import { PRODUCTS_TYPES } from "../../consts";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { productsReducer } from "../../reducers/products.reducer";
import { Product, ProductDTO, ProductPriceBySupplierRequestDTO, ProductRequestDTO, ProductToImport } from "../../interfaces/product.interfaces";


interface ProductsPaginateResponse {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalSize: number;
    rows: Product[];
}


const initialSearchPagination = {
    sku: '',
    barcode: '',
    supplierId: 0,
    categoryId: 0,
}

export const useProducts = () => {
    const [products, productsDispatch] = useReducer(productsReducer, []);
    const { addAlert } = useContext(AlertsContext);
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productPageIndexInternal, setProductsPageIndexInternal] = useState(1);
    const [productsPagination, setProductsPagination] = useState({
        pageIndex: 1,
        pageSize: 10,
        totalPages: 0,
        totalSize: 0,
    });
    const [searchPagination, setSearchPagination] = useState({
        filters: initialSearchPagination,
    })

    const handleSearch = (filters: typeof searchPagination.filters) => {
        setSearchPagination({
            ...searchPagination,
            filters: filters
        })

    }



    const navigate = useNavigate();


    const updateSalePriceForSupplierId = async (body: { percentageToUp: number; supplierId: number }) => {
        if (body.percentageToUp === 0 || body.supplierId === 0) return;
        try {
            const params: ProductPriceBySupplierRequestDTO = {
                PercentageToUp: body.percentageToUp,
                supplierId: body.supplierId
            }

            const response: ApiResponse = await httpClient.put('/product/update-purchase-price', {}, { params });

            addAlert({
                message: response.data.message,
                type: 'success',
                duration: 4000
            })

        }
        catch (error) {
            addAlert({
                message: 'Ocurrió un error al actualizar los precios',
                type: 'error',
                duration: 4000
            })
        }


    }

    const handleNextPage = async () => {
        if (productsPagination.pageIndex >= productsPagination.totalPages) return;
        setProductsPageIndexInternal(productPageIndexInternal + 1);
        await getProductsPaginated(productPageIndexInternal + 1);

    }
    const handlePreviousPage = async () => {
        if (productsPagination.pageIndex <= 1) return;
        setProductsPageIndexInternal(productPageIndexInternal - 1);
        await getProductsPaginated(productPageIndexInternal - 1)

    }


    const bulkCreateProducts = async (products: ProductToImport[]): Promise<ApiResponseBody<null>> => {
        try {
            const response: ApiResponse = await httpClient.post('/product/import', products);
            if (response.data.errors?.length! > 0) throw new Error();
            
            addAlert({
                duration: 4000,
                message: response.data.message,
                type: "success",
            });

            return response.data
        }
        catch (error) {
            
            const err = error as AxiosError<ApiResponseBody>;
            addAlert({
                duration: 4000,
                message: err.response?.data.message || 'Ocurrió un error inesperado por favor vuelva a intentarlo',
                type: "error",
            });
            return err.response?.data || {
                data: null,
                errors: [],
                hasError: true,
                message: '',
                statusCode: 412,
                traceId: 1212
            }
        }
    }

    const deleteProduct = async (id: number) => {
        try {
            const { data }: ApiResponse<Product> = await httpClient.delete(`/product/${id}`)
            productsDispatch({
                type: PRODUCTS_TYPES.DELETE,
                payload: { id: id } as Product
            });
            addAlert({
                duration: 4000,
                message: data.message,
                type: 'success'
            });

            await getProductsPaginated();
            if (products.length - 1 === 0) setProductsPageIndexInternal(1);
        }
        catch (error) {

            addAlert({
                duration: 4000,
                message: 'Ocurrió un error inesperado al intentar eliminar un producto',
                type: 'error',
            })
        }
    };


    const updateProduct = async (newProduct: ProductDTO, id: number) => {
        try {
            const { data }: ApiResponse<Product> = await httpClient.put(`/product/${id}`, newProduct)

            addAlert({
                duration: 4000,
                message: data.message,
                type: 'success'
            });
            navigate('/products')
            
            setSearchPagination({
                filters: initialSearchPagination
            })
            return null;
        }
        catch (error) {

            const errorAxios = error as AxiosError<ApiResponseBody>

            addAlert({
                duration: 4000,
                message: errorAxios.response?.data.message as string ?? 'Ocurrió un error inesperado al intentar editar un producto',
                type: 'error',
            });

            return error as AxiosError<ApiResponseBody>;
        }
    };


    const createProduct = async (newProduct: ProductDTO) => {
        try {
            const { data }: ApiResponse<Product> = await httpClient.post(`/product`, newProduct)
            const newProductResponse = data.data;
            productsDispatch({
                type: PRODUCTS_TYPES.CREATE,
                payload: newProductResponse
            });
            addAlert({
                duration: 6000,
                message: data.message,
                type: 'success'
            });
            navigate('/products')
            await getProductsPaginated();
            setSearchPagination({
                filters: initialSearchPagination
            })
            return null
        }
        catch (error) {
            const errorAxios = error as AxiosError<ApiResponseBody>

            addAlert({
                duration: 4000,
                message: errorAxios.response?.data.message as string ?? 'Ocurrió un error inesperado al intentar crear un producto',
                type: 'error',
            });

            return error as AxiosError<ApiResponseBody>;
        }
    };

    const getProductsPaginated = async (newPageIndex?: number) => {
        setIsProductsLoading(true)
        try {

            const params: ProductRequestDTO = {
                pageSize: 10,
                pageIndex: newPageIndex ?? productPageIndexInternal,
                CategoryId: searchPagination.filters.categoryId,
                BarCode: searchPagination.filters.barcode,
                SKU: searchPagination.filters.sku,
                SupplierId: searchPagination.filters.supplierId,
            };

            const { data }: ApiResponse<ProductsPaginateResponse> = await httpClient.get(`/product/paginate`, { params });
            const { pageIndex, rows, totalPages, totalSize } = data.data;
            setProductsPagination({
                pageIndex: pageIndex,
                pageSize: 3,
                totalPages: totalPages,
                totalSize: totalSize
            })

            productsDispatch({
                type: PRODUCTS_TYPES.INITIALIZER,
                payload: rows,
            })
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setIsProductsLoading(false)
        }
    };

    const getAllProducts = async () => {
        try {

            const { data }: ApiResponse<Product[]> = await httpClient.get(`/product/all`);
            return data.data;

        }
        catch (error) {
            return [];
        }
    };

    const getProductById = async (id: number | string) => {
        try {
            const { data }: ApiResponse<Product> = await httpClient.get(`/product/${id}`);

            return {
                hasErrors: false,
                response: data.data
            }
        }
        catch (error) {
            const err = error as AxiosError<ApiResponseBody>;

            return {
                hasErrors: true,
                response: {
                    errors: err.response?.data.errors || [],
                    errCode: err.response?.status || 0
                }
            };
        }
    }




    return {
        isProductsLoading,
        productsPagination,
        products,
        searchPagination,
        productPageIndexInternal,
        createProduct,
        updateProduct,
        deleteProduct,
        getAllProducts,
        handleNextPage,
        handlePreviousPage,
        getProductById,
        handleSearch,
        getProductsPaginated,
        updateSalePriceForSupplierId,
        bulkCreateProducts
    }
}
